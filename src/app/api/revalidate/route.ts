import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Webhook payload type from Sanity
type WebhookPayload = {
	_type: string;
	slug?: { current: string };
	_id: string;
};

// Map of content types to their revalidation tags
const REVALIDATION_MAP: Record<string, (payload: WebhookPayload) => string[]> =
	{
		post: (payload) => [
			"post",
			"posts",
			"latestPosts",
			...(payload.slug ? [`post-${payload.slug.current}`] : []),
		],
		postCategory: () => ["postCategory"],
		homePage: () => ["home-page-data"],
		generalInfo: () => ["generalInfo"],
		service: (payload) => [
			"services",
			"service",
			...(payload.slug ? [`service-${payload.slug.current}`] : []),
		],
		caseStudy: (payload) => [
			"caseStudies",
			"caseStudy",
			...(payload.slug ? [`caseStudy-${payload.slug.current}`] : []),
		],
		aboutPage: () => ["aboutPage"],
		contactPage: () => ["contactPage"],
		careersPage: () => ["careersPage"],
		privacyPolicy: () => ["privacyPolicy"],
		cookiePolicy: () => ["cookiePolicy"],
		termsOfUse: () => ["termsOfUse"],
		// Referenced types that affect parent pages
		teamMember: () => ["home-page-data", "aboutPage"],
		openPosition: () => ["careersPage"],
		approachSection: () => ["aboutPage"],
		visionSection: () => ["aboutPage"],
	};

export async function POST(req: NextRequest) {
	try {
		const secret = process.env.SANITY_REVALIDATION_SECRET;

		if (!secret) {
			console.error("Missing SANITY_REVALIDATION_SECRET environment variable");
			return NextResponse.json(
				{ error: "Server configuration error" },
				{ status: 500 },
			);
		}

		// Parse body and verify signature using next-sanity
		// This also waits for Content Lake eventual consistency
		const { isValidSignature, body: payload } = await parseBody<WebhookPayload>(
			req,
			secret,
			true, // Wait for Content Lake eventual consistency
		);

		// Verify signature
		if (isValidSignature === false) {
			console.error("Invalid webhook signature");
			return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
		}

		if (!payload || !payload._type) {
			console.error("Invalid webhook payload:", payload);
			return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
		}

		const { _type, _id } = payload;

		console.log(
			`[Webhook] Received revalidation request for type: ${_type}, id: ${_id}`,
		);

		// Get tags to revalidate for this content type
		const getTagsFn = REVALIDATION_MAP[_type];

		if (!getTagsFn) {
			console.warn(`[Webhook] No revalidation mapping for type: ${_type}`);
			return NextResponse.json(
				{
					message: "No revalidation needed for this content type",
					type: _type,
				},
				{ status: 200 },
			);
		}

		const tags = getTagsFn(payload);

		console.log(`[Webhook] Revalidating tags:`, tags);

		// Revalidate all relevant tags
		// Using { expire: 0 } for immediate expiration (required for webhooks)
		// See: https://nextjs.org/docs/app/api-reference/functions/revalidateTag
		for (const tag of tags) {
			revalidateTag(tag, { expire: 0 });
			console.log(`[Webhook] ✓ Revalidated tag: ${tag}`);
		}

		return NextResponse.json({
			revalidated: true,
			type: _type,
			tags,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("[Webhook] Revalidation error:", error);
		return NextResponse.json(
			{
				error: "Revalidation failed",
				message: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}

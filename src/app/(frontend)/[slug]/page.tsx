import { notFound } from 'next/navigation';
import NotFound from '../not-found';

const Page = () => {
  notFound();

  return NotFound();
};

export default Page;

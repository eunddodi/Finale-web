import Image from "next/image";
import Link from "next/link";

export default function SchedulePage() {
  return (
    <div>
      <Image src='/time-table/June/total.jpg' width={750} height={870} alt='Time table of June 2024' className='my-8' />
      <Image src='/time-table/June/lessons.jpg' width={750} height={890} alt='Time table of June 2024' className='my-8' />
      <Image src='/time-table/June/calendar.jpg' width={750} height={100} alt='Time table of June 2024' className='my-8' />
      <Link href={'/lessons'}>수강신청 하러 가기</Link>
    </div>
  );
}

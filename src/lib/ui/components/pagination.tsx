import Link from "next/link";
import { Fragment } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { 
  ChevronDoubleRightIcon, 
  ChevronRightIcon, 
  ChevronDoubleLeftIcon, 
  ChevronLeftIcon 
} from "@heroicons/react/16/solid";

import { generatePagination } from "@/lib/utils";

import clsx from "clsx";


export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const pagination = generatePagination(currentPage, totalPages);

  function createPageURL(pageNumber: number | string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className="flex justify-center items-center gap-1 md:gap-3">
      {currentPage > 1 && (
          <PaginationArrows 
            direction="left" 
            href={{ 
              single: createPageURL(currentPage-1), 
              double: createPageURL(1),
            }} 
          />
        )}
      <div className="flex justify-center gap-1 w-fit p-2 bg-red-500 rounded-full">
        {pagination.map(page => {
          return (
            <Fragment key={page}>
              <PaginationNumber
                page={page}
                active={page === currentPage}
                href={createPageURL(page)}
              />
            </Fragment>
          )
        })}
      </div>
      {currentPage < totalPages && (
          <PaginationArrows 
            direction="right"
            href={{
              single: createPageURL(currentPage+1),
              double: createPageURL(totalPages),
            }}
          />
        )}
    </div>
  );
}

function PaginationNumber({ 
  page, 
  active, 
  href 
} : { 
  page: number, 
  active: boolean, 
  href: string 
}) {
  const linkStyle = clsx(
    "flex justify-center items-center w-5 h-5 rounded-full text-xs text-white font-semibold\
      md:w-8 md:h-8 md:text-md",
    {
      "bg-white text-red-500 pointer-events-none" : active,
      "hover:bg-white hover:text-red-500" : !active,
    }
  );

  return (
    <Link href={href} className={linkStyle}>
      {page}
    </Link>
  )
}

function PaginationArrows({
  direction,
  href,
}: {
  direction: "left" | "right";
  href: { single: string, double: string };
}) {
  const arrowStyle = "w-6 h-6 bg-red-500 text-white rounded-full\
    md:w-7 md:h-7"

  if (direction === 'left') {
    return (
      <>
        <Link href={href.double}><ChevronDoubleLeftIcon className={arrowStyle} /></Link>
        <Link href={href.single}><ChevronLeftIcon className={arrowStyle} /></Link>
      </>
    )
  }
  
  return (
    <>
      <Link href={href.single}><ChevronRightIcon className={arrowStyle} /></Link>
      <Link href={href.double}><ChevronDoubleRightIcon className={arrowStyle} /></Link>
    </>
  )
}

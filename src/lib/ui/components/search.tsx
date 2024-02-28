import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";

import { useDebouncedCallback } from "use-debounce";


export default function Search({ placeholder } : { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback(term => {
    console.log("Searching...", term);

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 300);

  return (
    <div className="flex justify-center">
      <input type="text" className="w-44 pl-1 border border-gray-400 rounded"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('search')?.toString()}
      />
    </div>
  )
}
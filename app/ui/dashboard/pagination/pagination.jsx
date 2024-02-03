"use client";

import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ count }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);
  const ITEMS_PER_PAGE = 10;

  const hasPrev = ITEMS_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext =
    ITEMS_PER_PAGE * (parseInt(page) - 1) + ITEMS_PER_PAGE < count;

  const handleChangePage = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          disabled={!hasPrev}
          onClick={() => handleChangePage("prev")}
        >
          Prev
        </button>
        <button
          className={styles.button}
          disabled={!hasNext}
          onClick={() => handleChangePage("next")}
        >
          Next
        </button>
      </div>
      <div className={styles.pageCounter}>
        Page {page} of {Math.ceil(count / ITEMS_PER_PAGE)}
      </div>
    </div>
  );
};

export default Pagination;

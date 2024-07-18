import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // 모달 안 클릭
      //   console.log(event.target);

      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      // 모달 밖 클릭
      handler();
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}

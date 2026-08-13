"use client";

import RouteErrorPage from "@/components/errors/RouteErrorPage";

type ErrorProps = Readonly<{
  reset: () => void;
}>;

export default function Error({
  reset,
}: ErrorProps) {
  return (
    <RouteErrorPage
      reset={reset}
    />
  );
}

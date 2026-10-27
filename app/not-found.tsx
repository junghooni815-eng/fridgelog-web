import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>아직 없는 페이지예요</h1>
      <p className="lead">준비 중이거나 주소가 바뀌었을 수 있습니다.</p>
      <p><Link href="/">재료 목록으로</Link></p>
    </>
  );
}

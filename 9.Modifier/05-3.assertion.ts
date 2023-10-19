// 9.Modifier/05-3.assertion.ts

try {
  // 오류를 발생시키는 코드
} catch (error) {
  console.log("Error!!!", error instanceof Error ? error.message : error);
}

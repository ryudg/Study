// 9.Modifier/05-2.assertion.ts

try {
  // 오류를 발생시키는 코드
} catch (error) {
  console.log("Error!!!", (error as Error).message);
}

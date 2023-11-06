// 11.Declaration/04-2.style.d.ts

declare module "*.module.css" {
  const styles: { [i: string]: string };
  export default styles;
}

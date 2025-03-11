import Image from "next/image";

export default function Home() {
  const theme = "Theme1"; 
  const Theme = require(`@/components/${theme}`).default;

  return (
    <div>
      <Theme />
    </div>
  );
}

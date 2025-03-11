import Image from "next/image";

const getSettings = async () => {
  const res = await fetch("https://portfolioapi.test.monitorfly.com/api/settings/activeTheme", {
    cache: "no-store", 
  });
  return res.json();
};

export default async function Home() {
  const settings = await getSettings();
  console.log("settings", settings?.value);
  const theme = "Theme1"; 
  const Theme = require(`@/components/${settings?.value}`).default;

  return (
    <div>
      <Theme data={settings?.value} />
    </div>
  );
}

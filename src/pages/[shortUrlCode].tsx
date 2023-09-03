import { GetServerSideProps } from "next";

type Link = {
  success: boolean;
  message?: string;
  originUrl?: string;
};

export const getServerSideProps: GetServerSideProps<{
  link: Link;
}> = async (context) => {
  const { shortUrlCode } = context.query;

  const res = await fetch(`${process.env.HOST_URL}/api/${shortUrlCode}`);

  const data = await res.json();

  let url = "/";

  if (data.success) {
    url = data.originUrl;
  }

  return {
    redirect: {
      destination: url,
      permanent: true,
    },
  };
};

export default function ShortUrlCode() {
  return null;
}

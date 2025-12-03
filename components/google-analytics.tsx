import Script from 'next/script';
import { siteConfig } from '@/config/site';

export default function GoogleAnalytics() {
  const measurementId = siteConfig.googleAnalyticsId;

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script id="google-analytics">
        {
        `window.dataLayer = window.dataLayer || [];
        function gtag() {dataLayer.push(arguments);}
        gtag("js", new Date());
        gtag("config", "${measurementId}");`
      }
      </Script>
    </>
  );
}

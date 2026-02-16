import { calculateHarmony } from '../utils/alchemy';
import ingredients from '../data/ingredients.json';

const EXTERNAL_DATA_URL = 'https://culinary-alchemist.vercel.app'; // Replace with your actual domain

function generateSiteMap(pairings) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Manual URLs -->
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/ingredients</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     <!-- Dynamic Pairing URLs -->
     ${pairings
            .map(({ slug }) => {
                return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/pairing/${slug}`}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.6</priority>
       </url>
     `;
            })
            .join('')}
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    // Generate all possible pairing combinations
    const pairings = [];
    for (let i = 0; i < ingredients.length; i++) {
        for (let j = i + 1; j < ingredients.length; j++) {
            pairings.push({
                slug: `${ingredients[i].slug}-and-${ingredients[j].slug}`
            });
        }
    }

    // Generate the XML sitemap with the pairings data
    const sitemap = generateSiteMap(pairings);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;

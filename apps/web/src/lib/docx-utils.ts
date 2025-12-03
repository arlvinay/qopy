import JSZip from 'jszip';

export async function getDocxPageCount(file: File): Promise<number> {
    try {
        const zip = new JSZip();
        const content = await zip.loadAsync(file);

        // The page count is usually stored in docProps/app.xml
        const appXml = await content.file('docProps/app.xml')?.async('string');

        if (appXml) {
            // Parse XML to find <Pages> tag
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(appXml, 'text/xml');
            const pagesNode = xmlDoc.getElementsByTagName('Pages')[0];

            if (pagesNode && pagesNode.textContent) {
                const pages = parseInt(pagesNode.textContent, 10);
                return isNaN(pages) ? 1 : pages;
            }
        }

        return 1; // Default fallback
    } catch (error) {
        console.error('Error counting DOCX pages:', error);
        return 1;
    }
}

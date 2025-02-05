interface FlattenedDocument {
    id?: string;
    title?: string;
    content: string;
    tags?: string[];
    author?: string;
    createdAt?: string;
    meta?: Record<string, string>;
    toc?: string[];
}

/**
 * Recursively translates a Tiramisu JSON node into plain text
 * This function ignores code blocks (nodes with functionName === "code")
 * and extracts special nodes (title, meta, toc, tags) into the document result
 */
function flattenTiramisu(node: any): FlattenedDocument {
    const result: FlattenedDocument = { content: "", meta: {}, tags: [], toc: [] };

    function traverse(n: any): string {
        if (typeof n === "string") {
            return n;
        }

        if (Array.isArray(n)) {
            return n.map(traverse).join(" ");
        }

        if (typeof n === "object") {
            if (n.functionName) {
                if (n.functionName === "code") {
                    return "";
                }
                if (n.functionName === "title" && n.parameters && n.parameters.parameters) {
                    const titleText = n.parameters.parameters
                        .map((p: any) => traverse(p.value))
                        .join(" ")
                        .trim();
                    if (!result.title) {
                        result.title = titleText;
                    }
                    return "";
                }

                if (n.functionName === "meta" && n.parameters && n.parameters.parameters) {
                    n.parameters.parameters.forEach((p: any) => {
                        if (p.name && p.value) {
                            const text = traverse(p.value).trim();
                            result.meta![p.name] = text;
                            
                            //ONLY IF YOU WANT THESE OUTSIDE META OBJECT

                            // if (p.name === "author") result.author = text;
                            // if (p.name === "createdAt") result.createdAt = text;
                        }
                    });
                    return "";
                }
                if (n.functionName === "toc" && n.parameters && n.parameters.parameters) {
                    result.toc = n.parameters.parameters.map((p: any) => traverse(p.value).trim());
                    return "";
                }
                if (n.functionName === "tags" && n.parameters && n.parameters.parameters) {
                    result.tags = n.parameters.parameters.map((p: any) => traverse(p.value).trim());
                    return "";
                }
                if (n.parameters) {
                    return traverse(n.parameters);
                }
                return "";
            }

            let text = "";
            if (n.shards) {
                text += traverse(n.shards) + " ";
            }
            if (n.children) {
                text += traverse(n.children) + " ";
            }
            return text;
        }
        return "";
    }

    result.content = traverse(node).trim();
    return result;
}
namespace MyFactory {
    const Fragment = "<></>";

    export function createElement(tagName: string, attributes: any | null, ...children: any[]): Element | DocumentFragment {
        if (tagName === Fragment) {
            return document.createDocumentFragment();
        }

        const element = document.createElement(tagName);
        if (attributes) {
            for (const key of Object.keys(attributes)) {
                const attributeValue = attributes[key];

                if (key === "className") {
                    element.setAttribute("class", attributeValue);
                } else if (key.startsWith("on") && typeof attributes[key] === "function") {
                    element.addEventListener(key.substring(2), attributeValue);
                } else {
                    if (typeof attributeValue === "boolean" && attributeValue) {
                        element.setAttribute(key, "");
                    } else {
                        element.setAttribute(key, attributeValue);
                    }
                }
            }
        }

        for (const child of children) {
            appendChild(element, child);
        }

        return element;
    }

    function appendChild(parent: Node, child: any) {
        if (typeof child === "undefined" || child === null) {
            return;
        }

        if (Array.isArray(child)) {
            for (const value of child) {
                appendChild(parent, value);
            }
        } else if (typeof child === "string") {
            parent.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            parent.appendChild(child);
        } else if (typeof child === "boolean") {
        } else {
            parent.appendChild(document.createTextNode(String(child)));
        }
    }
}
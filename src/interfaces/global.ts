export interface Global {
    data: Data;
    meta: null;
}

export interface Data {
    id:             number;
    documentId:     string;
    createdAt:      Date;
    updatedAt:      Date;
    publishedAt:    Date;
    logoLightTheme: Favicon;
    logoDarkTheme:  Favicon;
    favicon:        Favicon;
    header:         Header;
    footer:         Footer;
}

export interface Favicon {
    id:         number;
    documentId: string;
    width:      number;
    height:     number;
    url:        string;
}

export interface Footer {
    id:              number;
    footerLinks:     Link[];
    categoriesLinks: Link[];
}

export interface Link {
    id:             number;
    label:          string;
    href:           string;
    isExternalLink: boolean;
}

export interface Header {
    id:       number;
    navLink:  Link[];
    dropdown: Dropdown[];
}

export interface Dropdown {
    id:    number;
    label: string;
    link:  Link[];
}
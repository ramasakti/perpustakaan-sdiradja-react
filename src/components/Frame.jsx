import React, { useState, useEffect } from "react";

export default function Frame({ children }) {
    const [dataNavbar, setDataNavbar] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchNavbar = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://192.168.8.174/app/navbar.php`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:5173'
                }
            })
            const data = await response.json()

            if (response.ok) setDataNavbar(data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNavbar()
    }, [])

    return (
        <div className="page">
            <aside className="navbar navbar-vertical navbar-expand-lg navbar-transparent">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar-menu" aria-controls="sidebar-menu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <h1 className="navbar-brand navbar-brand-autodark">
                        <a href="/" className="text-decoration-none">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ90LDFPYa_hDfxIwL9Q1ZyVHvujPSLUH_SmWgZVAJPGA&s" width="110" height="110" alt="SMA Islam Parlaungan" className="navbar-brand-image" />
                        </a>
                    </h1>

                    <div className="collapse navbar-collapse" id="sidebar-menu">
                        <ul className="navbar-nav pt-lg-3">
                            {dataNavbar && dataNavbar.map((menuItem, index) => (
                                <MenuItem key={index} menuItem={menuItem} />
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>
            <div className="page-wrapper">
                <div className="page-body">
                    <div className="container-xl">
                        {children}
                    </div>
                </div>

                <footer className="footer footer-transparent d-print-none">
                    <div className="container-xl">
                        <div className="row text-center align-items-center flex-row-reverse">
                            <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                                <ul className="list-inline list-inline-dots mb-0">
                                    <li className="list-inline-item">
                                        Copyright © {new Date().getFullYear()} |
                                        Made With ❤ by <a href="github.com/ramasakti"><strong>Rama Sakti</strong></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
};

function MenuItem({ menuItem }) {
    if (menuItem.section === null) {
        return (
            <>
                {menuItem.menu.map((element, index) => (
                    <li key={index} className="nav-item">
                        <a key={index} href={element.route} className="nav-link">
                            {element.menu_name}
                        </a>
                    </li>
                ))}
            </>
        );
    } else {
        if (menuItem.menu && menuItem.menu.length > 0) {
            return (
                <li className="nav-item dropdown">
                    <a href="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="false" role="button" aria-expanded="false">
                        <div dangerouslySetInnerHTML={{ __html: menuItem.icon }} />
                        <span className="nav-link-title ms-2">
                            {menuItem.section}
                        </span>
                    </a>
                    <div className="dropdown-menu">
                        <div className="dropdown-menu-columns">
                            <div className="dropdown-menu-column">
                                {menuItem.menu.map((subItem, index) => (
                                    <NestedMenuItem key={index} menuItem={subItem} />
                                ))}
                            </div>
                        </div>
                    </div>
                </li>
            );
        } else {
            return (
                <li className="nav-item">
                    <a href={menuItem.route ? menuItem.route : ''} className="nav-link">
                        {menuItem.menu_name}
                    </a>
                </li>
            );
        }
    }
}

function NestedMenuItem({ menuItem }) {
    if (menuItem.submenu && menuItem.submenu.length > 0) {
        return (
            <div className="dropdown">
                <a href="/" className="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="false" role="button" aria-expanded="false">
                    {menuItem.menu_name}
                </a>
                <div className="dropdown-menu">
                    {menuItem.submenu.map((subMenuItem, index) => (
                        <a key={index} href={subMenuItem.submenu_route} className="dropdown-item">
                            {subMenuItem.submenu}
                        </a>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <a href={menuItem.route ? menuItem.route : ''} className="dropdown-item">
                {menuItem.menu_name}
            </a>
        );
    }
}
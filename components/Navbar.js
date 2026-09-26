"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar({ onGoToAllPlans, isHome = true }) {
  const [mob, setMob] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "sc" : ""} ${mob ? "mo" : ""}`}>
      <a href={isHome ? "#" : "/"} className="nl" aria-label="Lima Technology Inicio">
        <Image src="/LimaTechnology.png" alt="Lima Technology" className="nl-img" width={130} height={66} priority />
      </a>
      <ul className="nk">
        <li><a href={isHome ? "#servicios" : "/#servicios"} onClick={() => setMob(false)}>Servicios Digitales</a></li>
        <li className="nk-item-has-submenu">
          <a href={isHome ? "#planes" : "/#planes"} onClick={() => setMob(false)}>Planes</a>
          <ul className="submenu">
            <li>
              <a 
                href={isHome ? "#" : "/#planes"} 
                onClick={(e) => { 
                  if (onGoToAllPlans) {
                    e.preventDefault(); 
                    onGoToAllPlans(); 
                  }
                  setMob(false); 
                }}
              >
                Ver todos los planes
              </a>
            </li>
          </ul>
        </li>
        <li><a href={isHome ? "#nosotros" : "/#nosotros"} onClick={() => setMob(false)}>Nosotros</a></li>
        <li><a href={isHome ? "#clientes" : "/#clientes"} onClick={() => setMob(false)}>Clientes</a></li>
        <li><a href={isHome ? "#contacto" : "/contacto"} onClick={() => setMob(false)}>Contacto</a></li>
      </ul>
      
      <button className="btn-menu" onClick={() => setMob(!mob)} aria-label={mob ? "Cerrar menú" : "Abrir menú"}>
        {mob ? "✕" : "☰"}
      </button>
    </nav>
  );
}

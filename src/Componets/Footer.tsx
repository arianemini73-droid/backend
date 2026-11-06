// import React from 'react'

function Footer() {
    return (
        <>

                <footer className="bg-[#203846] text-white">
                <div className="max-w-7xl mx-auto px-6 py-12">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Logo / Emri */}
                    <div>
                        <div className="text-4xl font-bold tracking-widest mb-4">
                        HLL
                        </div>

                        <h2 className="text-xl font-semibold">
                        Hashim Llumnica
                        </h2>

                        <p className="text-gray-300 mt-3 leading-relaxed">
                        Mirë se vini në hapësirën time personale.
                        Këtu mund të gjeni më shumë rreth meje,
                        punës dhe aktiviteteve të mia.
                        </p>
                    </div>

                    {/* Linket */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                        Navigimi
                        </h3>

                        <ul className="space-y-3 text-gray-300">
                        <li>
                            <a href="#home" className="hover:text-white transition">
                            Ballina
                            </a>
                        </li>

                        <li>
                            <a href="#about" className="hover:text-white transition">
                            Rreth Meje
                            </a>
                        </li>

                        <li>
                            <a href="#projects" className="hover:text-white transition">
                            Projektet
                            </a>
                        </li>

                        <li>
                            <a href="#contact" className="hover:text-white transition">
                            Kontakt
                            </a>
                        </li>
                        </ul>
                    </div>

                    {/* Kontakt */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                        Kontakti
                        </h3>

                        <div className="space-y-3 text-gray-300">
                        <p>📧 Email: your@email.com</p>
                        <p>📱 Tel: +383 XX XXX XXX</p>
                        <p>📍 Kosovë</p>
                        </div>

                        {/* Social Media */}
                        <div className="flex gap-4 mt-6">
                        <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                        >
                            f
                        </a>

                        <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                        >
                            in
                        </a>

                        <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                        >
                            IG
                        </a>
                        </div>
                    </div>

                    </div>

                    {/* Bottom */}
                    <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-400">
                    <p>
                        © {new Date().getFullYear()} Hashim Llumnica. Të gjitha të drejtat e rezervuara.
                    </p>

                    <p>
                        Designed & AR-DI tech
                    </p>
                    </div>

                </div>
                </footer>

                
        </>
    )
}

export default Footer

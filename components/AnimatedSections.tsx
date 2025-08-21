'use client';

import { motion } from 'framer-motion';
import { QrCode, Github, Palette, Download, Zap, Sparkles, Smartphone, CheckCircle } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium bg-[#00cdb6]/10 text-[#00cdb6] rounded-full mb-4">
            Fitur Unggulan
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Semua yang Anda Butuhkan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Solusi lengkap untuk semua kebutuhan QR code Anda dengan fitur-fitur canggih dan mudah digunakan.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="h-8 w-8 text-white" />,
              title: "Generate Cepat",
              description: "Buat QR code dalam hitungan detik dengan antarmuka yang mudah digunakan.",
              color: "#00cdb6"
            },
            {
              icon: <Palette className="h-8 w-8 text-white" />,
              title: "Kustomisasi Lengkap",
              description: "Ubah warna, tambahkan logo, dan sesuaikan tampilan QR code sesuai merek Anda.",
              color: "#00a396"
            },
            {
              icon: <Download className="h-8 w-8 text-white" />,
              title: "Download Mudah",
              description: "Ekspor QR code dalam format PNG atau SVG dengan kualitas tinggi.",
              color: "#008b7a"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100"
            >
              <div className="relative flex-1 flex flex-col">
                <motion.div 
                  className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center shadow-lg" 
                  style={{ 
                    backgroundColor: feature.color,
                    color: 'white',
                    boxShadow: `0 4px 14px 0 ${feature.color}40`
                  }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: `0 8px 20px 0 ${feature.color}60`
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 400, 
                    damping: 10 
                  }}>
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium bg-[#00cdb6]/10 text-[#00cdb6] rounded-full mb-4">
            Cara Kerjanya
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Hanya 4 Langkah Mudah
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Buat QR code profesional dalam hitungan menit dengan panduan langkah demi langkah kami.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {[
            {
              icon: <Smartphone className="h-5 w-5" />,
              title: "Pilih Template",
              description: "Pilih dari berbagai template yang tersedia atau gunakan opsi custom.",
              color: "#00cdb6"
            },
            {
              icon: <Sparkles className="h-5 w-5" />,
              title: "Masukkan Data",
              description: "Isi informasi yang ingin Anda ubah menjadi QR code.",
              color: "#00b4a0"
            },
            {
              icon: <Palette className="h-5 w-5" />,
              title: "Kustomisasi",
              description: "Sesuaikan tampilan QR code sesuai keinginan Anda.",
              color: "#009c8a"
            },
            {
              icon: <CheckCircle className="h-5 w-5" />,
              title: "Download & Gunakan",
              description: "Download QR code dan gunakan di media cetak atau digital Anda.",
              color: "#008b7a"
            }
          ].map((item, index, arr) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} items-start pb-12`}
            >
              {/* Icon */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10" 
                style={{ backgroundColor: item.color, boxShadow: `0 0 0 6px ${item.color}20` }}
              >
                {item.icon}
              </div>

              {/* Garis dashed (cuma muncul kalau bukan step terakhir) */}
              {index !== arr.length - 1 && (
                <div 
                  className="absolute left-1/2 top-10 -translate-x-1/2 border-l-2 border-dashed border-[#00cdb6] opacity-70 h-full"
                ></div>
              )}

              {/* Box */}
              <div className="bg-white w-[calc(50%-2rem)] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-500 mr-2">Langkah {index + 1}</span>
                  <div className="h-px w-8 bg-gray-200"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium bg-[#00cdb6]/10 text-[#00cdb6] rounded-full mb-4">
            Kontak
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Butuh Bantuan?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tim kami siap membantu menjawab pertanyaan Anda. Kirim pesan dan kami akan segera merespons.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00cdb6] focus:border-transparent transition-all duration-200"
                        placeholder="Nama Anda"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Alamat Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00cdb6] focus:border-transparent transition-all duration-200"
                        placeholder="email@contoh.com"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">Subjek</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00cdb6] focus:border-transparent transition-all duration-200"
                    placeholder="Apa yang bisa kami bantu?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Pesan Anda</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00cdb6] focus:border-transparent transition-all duration-200"
                    placeholder="Tulis pesan Anda secara detail..."
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#00cdb6] to-[#008b7a] text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#00cdb6]/20"
                >
                  Kirim Pesan
                </motion.button>
              </form>
            </div>
            <div className="bg-gray-50 px-8 py-6 text-center border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Atau hubungi kami di{' '}
                <a href="mailto:info@qreat.com" className="text-[#00cdb6] font-medium hover:underline">
                  info@qreat.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

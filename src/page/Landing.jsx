import React, { useState, useEffect } from "react";
import moment from 'moment'
import Frame from '../components/Frame.jsx';
import JenjangTabel from '../components/JenjangTabel.jsx';
import { SendToWhatsApp } from '../components/SendToWhatsApp.js';

export default function Landing() {
    const now = moment();
    now.locale('id');
    const [dataPeminjaman, setDataPeminjaman] = useState({});
    const [jumlahPeminjaman, setJumlahPeminjaman] = useState(0);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const fetchDataPeminjaman = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`http://192.168.8.174/app/api.php?tanggal=${formData.tanggal}`);
            const data = await response.json();

            if (response.ok) {
                let kelasPeminjamSet = new Set(data.kelas_peminjam.map(item => item.kelas));

                let filteredKelas = data.all_kelas.map(kelas => ({
                    kelas: kelas.nama_kelas,
                    status: kelasPeminjamSet.has(kelas.kode_kelas) ? '✅' : '❌'
                }));

                let groupedByLevel = filteredKelas.reduce((acc, { kelas, status }) => {
                    let level = kelas.split(' ')[1][0];
                    let simplifiedName = kelas.split(' ')[1];
                    let key = `Jenjang ${level}`;

                    if (!acc[key]) {
                        acc[key] = [];
                    }
                    acc[key].push({ kelas: simplifiedName, status });
                    return acc;
                }, {});

                setJumlahPeminjaman(data.jumlah_peminjaman.jumlah_peminjaman)
                setDataPeminjaman(groupedByLevel);
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false)
        }
    };

    const handleShareReport = async () => {
        let textMessage = ``;

        // Menambahkan header
        textMessage += `📚📚📚📚📚📚📚📚📚📚 \n`;
        textMessage += `Bismillahirrahmanirrahim...  \n`;
        textMessage += `Laporan Harian Peminjaman Buku \n`;
        textMessage += `${now.format('dddd MM YYYY')} \n\n`;

        // Menambahkan data
        Object.entries(dataPeminjaman).forEach(([key, value]) => {
            textMessage += `*${key}* \n`;  // Menambahkan judul tingkat
            value.forEach(item => {
                textMessage += `${item.kelas}${decodeURIComponent('%09')}${item.status} \n`;
            });
            textMessage += `\n`; // Baris kosong antar tingkat
        });

        textMessage += `*Jumlah Peminjaman: ${jumlahPeminjaman}* \n`;
        textMessage += `Mohon wali kelas menghimbau siswa-siswi nya untuk gemar membaca dan meminjam buku di perpustakaan`
        textMessage += `📚📚📚📚📚📚📚📚📚📚`

        let message = encodeURIComponent(textMessage);
        let url = `https://api.whatsapp.com/send/?phone=6285157177034&text=${message}&type=phone_number&app_absent=0`;
        window.open(url, '_blank');

        await SendToWhatsApp(textMessage)
    }

    useEffect(() => {
        fetchDataPeminjaman();
    }, [formData.tanggal]);

    const keys = Object.keys(dataPeminjaman);
    const rows = [];
    for (let i = 0; i < keys.length; i += 3) {
        rows.push(keys.slice(i, i + 3));
    }

    return (
        <Frame>
            <h1>
                Data Peminjaman
            </h1>

            <div class="mb-3">
                <label class="form-label">Tanggal</label>
                <input type="date" class="form-control" name="tanggal" defaultValue={formData.tanggal} onChange={handleChangeForm} />
            </div>

            {isLoading ? (
                <div class="spinner-border"></div>
            ) : (
                <>
                    <p>{now.format('dddd MMMM YYYY')}</p>
                    <p>Jumlah Peminjaman: {jumlahPeminjaman}</p>

                    <p>
                        Share Data To WhatsApp
                        <a href="#" className="mx-2" onClick={handleShareReport}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                                <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                            </svg>
                        </a>
                    </p>

                    {rows.map((row, rowIndex) => (
                        <div className="row" key={rowIndex}>
                            {row.map((key) => (
                                <div className="col-md-4" key={key}>
                                    <JenjangTabel jenjang={key} kelasList={dataPeminjaman[key]} />
                                </div>
                            ))}
                        </div>
                    ))}
                </>
            )}
        </Frame>
    );
}

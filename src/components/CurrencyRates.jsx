import React, { useEffect, useState } from "react";
import axios from "axios";
import Headline from "./Headline";
import { Currency, DollarSign } from "lucide-react";

const CurrencyRates = () => {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);

    // Replace with your actual API key
    const API_KEY = "814faeb971c5841522269e26";

    useEffect(() => {
        // Fetch the data from ExchangeRate API
        axios
            .get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
            .then((response) => {
                if (response.data.result === "success") {
                    setRates(response.data.conversion_rates); // Set the conversion rates to state
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching the data: ", error);
                setLoading(false);
            });
    }, []);

    // Fetch flag URL
    const getFlagUrl = (currencyCode) => {
        const flagMapping = {
            USD: "https://flagpedia.net/data/flags/h80/us.png",
            AED: "https://flagpedia.net/data/flags/h80/ae.png",
            AFN: "https://flagpedia.net/data/flags/h80/af.png",
            ALL: "https://flagpedia.net/data/flags/h80/al.png",
            AMD: "https://flagpedia.net/data/flags/h80/am.png",
            ANG: "https://flagpedia.net/data/flags/h80/aw.png",
            AOA: "https://flagpedia.net/data/flags/h80/ao.png",
            ARS: "https://flagpedia.net/data/flags/h80/ar.png",
            AUD: "https://flagpedia.net/data/flags/h80/au.png",
            AWG: "https://flagpedia.net/data/flags/h80/aw.png",
            AZN: "https://flagpedia.net/data/flags/h80/az.png",
            BAM: "https://flagpedia.net/data/flags/h80/ba.png",
            BBD: "https://flagpedia.net/data/flags/h80/bb.png",
            BDT: "https://flagpedia.net/data/flags/h80/bd.png",
            BGN: "https://flagpedia.net/data/flags/h80/bg.png",
            BHD: "https://flagpedia.net/data/flags/h80/bh.png",
            BIF: "https://flagpedia.net/data/flags/h80/bi.png",
            BMD: "https://flagpedia.net/data/flags/h80/bm.png",
            BND: "https://flagpedia.net/data/flags/h80/bn.png",
            BOB: "https://flagpedia.net/data/flags/h80/bo.png",
            BRL: "https://flagpedia.net/data/flags/h80/br.png",
            BSD: "https://flagpedia.net/data/flags/h80/bs.png",
            BTN: "https://flagpedia.net/data/flags/h80/bt.png",
            BWP: "https://flagpedia.net/data/flags/h80/bw.png",
            BYN: "https://flagpedia.net/data/flags/h80/by.png",
            BZD: "https://flagpedia.net/data/flags/h80/bz.png",
            CAD: "https://flagpedia.net/data/flags/h80/ca.png",
            CDF: "https://flagpedia.net/data/flags/h80/cd.png",
            CHF: "https://flagpedia.net/data/flags/h80/ch.png",
            CLP: "https://flagpedia.net/data/flags/h80/cl.png",
            CNY: "https://flagpedia.net/data/flags/h80/cn.png",
            COP: "https://flagpedia.net/data/flags/h80/co.png",
            CRC: "https://flagpedia.net/data/flags/h80/cr.png",
            CUP: "https://flagpedia.net/data/flags/h80/cu.png",
            CVE: "https://flagpedia.net/data/flags/h80/cv.png",
            CZK: "https://flagpedia.net/data/flags/h80/cz.png",
            DJF: "https://flagpedia.net/data/flags/h80/dj.png",
            DKK: "https://flagpedia.net/data/flags/h80/dk.png",
            DOP: "https://flagpedia.net/data/flags/h80/do.png",
            DZD: "https://flagpedia.net/data/flags/h80/dz.png",
            EGP: "https://flagpedia.net/data/flags/h80/eg.png",
            ERN: "https://flagpedia.net/data/flags/h80/er.png",
            ETB: "https://flagpedia.net/data/flags/h80/et.png",
            EUR: "https://flagpedia.net/data/flags/h80/eu.png",
            FJD: "https://flagpedia.net/data/flags/h80/fj.png",
            FKP: "https://flagpedia.net/data/flags/h80/fk.png",
            FOK: "https://flagpedia.net/data/flags/h80/fo.png",
            GBP: "https://flagpedia.net/data/flags/h80/gb.png",
            GEL: "https://flagpedia.net/data/flags/h80/ge.png",
            GGP: "https://flagpedia.net/data/flags/h80/gg.png",
            GHS: "https://flagpedia.net/data/flags/h80/gh.png",
            GIP: "https://flagpedia.net/data/flags/h80/gi.png",
            GMD: "https://flagpedia.net/data/flags/h80/gm.png",
            GNF: "https://flagpedia.net/data/flags/h80/gn.png",
            GTQ: "https://flagpedia.net/data/flags/h80/gt.png",
            GYD: "https://flagpedia.net/data/flags/h80/gy.png",
            HKD: "https://flagpedia.net/data/flags/h80/hk.png",
            HNL: "https://flagpedia.net/data/flags/h80/hn.png",
            HRK: "https://flagpedia.net/data/flags/h80/hr.png",
            HTG: "https://flagpedia.net/data/flags/h80/ht.png",
            HUF: "https://flagpedia.net/data/flags/h80/hu.png",
            IDR: "https://flagpedia.net/data/flags/h80/id.png",
            ILS: "https://flagpedia.net/data/flags/h80/il.png",
            IMP: "https://flagpedia.net/data/flags/h80/im.png",
            INR: "https://flagpedia.net/data/flags/h80/in.png",
            IQD: "https://flagpedia.net/data/flags/h80/iq.png",
            IRR: "https://flagpedia.net/data/flags/h80/ir.png",
            ISK: "https://flagpedia.net/data/flags/h80/is.png",
            JEP: "https://flagpedia.net/data/flags/h80/je.png",
            JMD: "https://flagpedia.net/data/flags/h80/jm.png",
            JOD: "https://flagpedia.net/data/flags/h80/jo.png",
            JPY: "https://flagpedia.net/data/flags/h80/jp.png",
            KES: "https://flagpedia.net/data/flags/h80/ke.png",
            KGS: "https://flagpedia.net/data/flags/h80/kg.png",
            KHR: "https://flagpedia.net/data/flags/h80/kh.png",
            KID: "https://flagpedia.net/data/flags/h80/ki.png",
            KMF: "https://flagpedia.net/data/flags/h80/km.png",
            KRW: "https://flagpedia.net/data/flags/h80/kr.png",
            KWD: "https://flagpedia.net/data/flags/h80/kw.png",
            KYD: "https://flagpedia.net/data/flags/h80/ky.png",
            KZT: "https://flagpedia.net/data/flags/h80/kz.png",
            LAK: "https://flagpedia.net/data/flags/h80/la.png",
            LBP: "https://flagpedia.net/data/flags/h80/lb.png",
            LKR: "https://flagpedia.net/data/flags/h80/lk.png",
            LRD: "https://flagpedia.net/data/flags/h80/lr.png",
            LSL: "https://flagpedia.net/data/flags/h80/ls.png",
            LYD: "https://flagpedia.net/data/flags/h80/ly.png",
            MAD: "https://flagpedia.net/data/flags/h80/ma.png",
            MDL: "https://flagpedia.net/data/flags/h80/md.png",
            MGA: "https://flagpedia.net/data/flags/h80/mg.png",
            MKD: "https://flagpedia.net/data/flags/h80/mk.png",
            MMK: "https://flagpedia.net/data/flags/h80/mm.png",
            MNT: "https://flagpedia.net/data/flags/h80/mn.png",
            MOP: "https://flagpedia.net/data/flags/h80/mo.png",
            MRU: "https://flagpedia.net/data/flags/h80/mr.png",
            MUR: "https://flagpedia.net/data/flags/h80/mu.png",
            MVR: "https://flagpedia.net/data/flags/h80/mv.png",
            MWK: "https://flagpedia.net/data/flags/h80/mw.png",
            MXN: "https://flagpedia.net/data/flags/h80/mx.png",
            MYR: "https://flagpedia.net/data/flags/h80/my.png",
            MZN: "https://flagpedia.net/data/flags/h80/mz.png",
            NAD: "https://flagpedia.net/data/flags/h80/na.png",
            NGN: "https://flagpedia.net/data/flags/h80/ng.png",
            NIO: "https://flagpedia.net/data/flags/h80/ni.png",
            NOK: "https://flagpedia.net/data/flags/h80/no.png",
            NPR: "https://flagpedia.net/data/flags/h80/np.png",
            NZD: "https://flagpedia.net/data/flags/h80/nz.png",
            OMR: "https://flagpedia.net/data/flags/h80/om.png",
            PAB: "https://flagpedia.net/data/flags/h80/pa.png",
            PEN: "https://flagpedia.net/data/flags/h80/pe.png",
            PGK: "https://flagpedia.net/data/flags/h80/pg.png",
            PHP: "https://flagpedia.net/data/flags/h80/ph.png",
            PKR: "https://flagpedia.net/data/flags/h80/pk.png",
            PLN: "https://flagpedia.net/data/flags/h80/pl.png",
            PYG: "https://flagpedia.net/data/flags/h80/py.png",
            QAR: "https://flagpedia.net/data/flags/h80/qa.png",
            RON: "https://flagpedia.net/data/flags/h80/ro.png",
            RSD: "https://flagpedia.net/data/flags/h80/rs.png",
            RUB: "https://flagpedia.net/data/flags/h80/ru.png",
            RWF: "https://flagpedia.net/data/flags/h80/rw.png",
            SAR: "https://flagpedia.net/data/flags/h80/sa.png",
            SBD: "https://flagpedia.net/data/flags/h80/sb.png",
            SCR: "https://flagpedia.net/data/flags/h80/sc.png",
            SDG: "https://flagpedia.net/data/flags/h80/sd.png",
            SEK: "https://flagpedia.net/data/flags/h80/se.png",
            SGD: "https://flagpedia.net/data/flags/h80/sg.png",
            SHP: "https://flagpedia.net/data/flags/h80/sh.png",
            SLE: "https://flagpedia.net/data/flags/h80/sl.png",
            SLL: "https://flagpedia.net/data/flags/h80/sl.png",
            SOS: "https://flagpedia.net/data/flags/h80/so.png",
            SRD: "https://flagpedia.net/data/flags/h80/sr.png",
            SSP: "https://flagpedia.net/data/flags/h80/ss.png",
            STN: "https://flagpedia.net/data/flags/h80/st.png",
            SYP: "https://flagpedia.net/data/flags/h80/sy.png",
            SZL: "https://flagpedia.net/data/flags/h80/sz.png",
            THB: "https://flagpedia.net/data/flags/h80/th.png",
            TJS: "https://flagpedia.net/data/flags/h80/tj.png",
            TMT: "https://flagpedia.net/data/flags/h80/tm.png",
            TND: "https://flagpedia.net/data/flags/h80/tn.png",
            TOP: "https://flagpedia.net/data/flags/h80/to.png",
            TRY: "https://flagpedia.net/data/flags/h80/tr.png",
            TTD: "https://flagpedia.net/data/flags/h80/tt.png",
            TVD: "https://flagpedia.net/data/flags/h80/tv.png",
            TWD: "https://flagpedia.net/data/flags/h80/tw.png",
            TZS: "https://flagpedia.net/data/flags/h80/tz.png",
            UAH: "https://flagpedia.net/data/flags/h80/ua.png",
            UGX: "https://flagpedia.net/data/flags/h80/ug.png",
            UYU: "https://flagpedia.net/data/flags/h80/uy.png",
            UZS: "https://flagpedia.net/data/flags/h80/uz.png",
            VES: "https://flagpedia.net/data/flags/h80/ve.png",
            VND: "https://flagpedia.net/data/flags/h80/vn.png",
            VUV: "https://flagpedia.net/data/flags/h80/vu.png",
            WST: "https://flagpedia.net/data/flags/h80/ws.png",
            XAF: "https://flagpedia.net/data/flags/h80/xaf.png",
            XCD: "https://flagpedia.net/data/flags/h80/xcd.png",
            XCG: "https://flagpedia.net/data/flags/h80/xcg.png",
            XDR: "https://flagpedia.net/data/flags/h80/xdr.png",
            XOF: "https://flagpedia.net/data/flags/h80/xof.png",
            XPF: "https://flagpedia.net/data/flags/h80/xpf.png",
            YER: "https://flagpedia.net/data/flags/h80/ye.png",
            ZAR: "https://flagpedia.net/data/flags/h80/za.png",
            ZMW: "https://flagpedia.net/data/flags/h80/zm.png",
            ZWL: "https://flagpedia.net/data/flags/h80/zw.png"
        };

        return flagMapping[currencyCode] || "https://flagpedia.net/data/flags/h80/default.png";
    };

    return (
        <>
           <div className="max-w-7xl mx-auto px-4 py-6 mt-6">
             <Headline name="মুদ্রা বিনিময় হার" link={<DollarSign />} />
           </div>
            <div className=" mx-auto p-4">
                {/* <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">Currency Rates against BDT</h1> */}
                {loading ? (
                    <div className="text-center text-xl text-gray-500">Loading...</div>
                ) : (
                    <div className="overflow-x-hidden">
                        <div className="flex space-x-2 p-2 animate-marquee hover:[animation-play-state:paused]">
                            {Object.keys(rates).map((currency) => (
                                <div
                                    key={currency}
                                    className="flex-shrink-0 w-30 flex flex-col items-center bg-[var(--bg-color)] rounded-lg shadow p-2 border border-gray-200"
                                >
                                    <img
                                        src={getFlagUrl(currency)}
                                        alt={`${currency} flag`}
                                        className="w-12 h-8 mb-2 rounded border-gray-200 "
                                    />
                                    <div className=" font-semibold text-[var(--primary-text-color)]">{currency}</div>
                                    <div className=" font-bold text-indigo-600 mt-1">
                                        {(1 / rates[currency] * rates["BDT"]).toFixed(2)} BDT
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


            </div>
        </>

    );
};

export default CurrencyRates;

import React, { useState, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import Select from '../../components/Select';
import bg from '../../images/report.png';
import { setUserGroup, getToken } from '../../redux/mainReducer';
import { useDispatch } from 'react-redux';

const User = () => {
    let [group, setGroup] = useState(false);
    let [report, setReport] = useState(false);
    const dispatch = useDispatch();
    const groupData = [], reportData = [];
    for (let i = 1; i <= 10; i++) {
        groupData.push({
            id: i,
            name: 'Группа ' + i
        });
        reportData.push({
            id: i,
            name: 'Отчет ' + i
        });
    }
    const clickItem = (setState) => (id, userId) => {
        setState(userId);
    }
    useEffect(() => {
        // dispatch(getToken());
    }, [])
    return (
        <div className="interface">
            <nav className="nav-container mb-small block">
                <div className="nav nav_user">
                    <Select data={groupData} value={group} clickItem={clickItem(setGroup)} text="Группа отчетов" addClass="interface__select" />
                    {group && <Select data={reportData} value={report} clickItem={clickItem(setReport)} text="Отчет" addClass="interface__select" />}
                </div>
            </nav>
            <main className="interface__content block">
                <PowerBIEmbed
                    embedConfig = {{
                        type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                        id: '7561bbf4-ea06-431c-ad83-98162e3fbe81',
                        embedUrl: '"https://app.powerbi.com/reportEmbed?reportId=7561bbf4-ea06-431c-ad83-98162e3fbe81&groupId=e5ceec25-983b-4efe-ac9a-8028647d50a3&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUQtUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImNlcnRpZmllZFRlbGVtZXRyeUVtYmVkIjp0cnVlfX0%3d"',
                        accessToken: "H4sIAAAAAAAEACWUxw6rWBZF_-VNaQkwuaUaEAzG5GhgRk6XYNIFWv3v7a6aH2lLa5-9_vPHTi8wpcWff_-JVsLyNZ30Fl2W9Wc4FMShy09hCzy3m_TjKvTSGjaT_XDDhJ8NBh79M42agC0qL2L7PdpOtV-UUYD1x_PaVji36EJBqDASJrIvzW4nfa5RvtTGPRNuDjpEIbVUc-OKOhxNl4_fZhDKfuFOx2Afas6W-ZahRA-D_tHVc2-zu0QdLxt_JMCWcfts3eRZBM0nr9WFkebzGDHn8wi2R6D0VdMIIw--SGAI_M4-2leuMCIlhXO-hT2FOKga6xo6FyeTtNQJk1-8t8qrBW7L3NdrY3OdS0Zdcs51j5j1YTiR0VblS1LeNxV63_GFV6U0WFaN82CMFoqA1eKyfi6k3YLH2rdTnlRcOfwlvE7wfQaq8kHjcGcmzl7gN1aN-4oKN9JhXdiXvJ0wICvHIIzxdF4HQZ3DXo3avFn4it5tKG9TN9zZyn4nLa0_lMXSS5rhYgDYMoZZzXoD6UcgA5FdDfXC19csGTAmjclKVNUNSh4pXdm0dDvKabcEzjcFibGxE6w3VO5EGJfBaboGxYommQy0-BrUg1tI10lI2hzkRo4W3RxnWrNN4opcr3HnkD8jN64KsF85kPiXS8w4pomUnVWBaFGFUYcHpwq8a7VpTF8qOCfT8TUTSae0hr5XREz17DWvFvM8-ZAsrfedi831TnDh-06Zy6-FehlYYXBVbMt6KBZucvp4kahuBgAdFCv8pDjYQ2FqtRFBbqjgsnlnMHNAshbYfAkUYVGSF1j7onH6Q9oZfm8nxomXD4EykwSrqtakfAVFKbz6JtBrTkK3k5NFH6Xs79w379sz7DZqj016K_clv1OvX4JkCjKUjG9wv0WJ54tH8IrCDWCsR8ifnf1MSF77WO389deff_0Rl2veJq28fjMjvPBdeEsTArcObuvVp-mTsQfDTp9XdXqAS0WiHjZ1mJZQGOgsxI1DGOeujrt274_Oh1Bt2BQAgxccjKmBZxxdEDlJ5QGxNMhZfJNHX3iDXadJeN8TywVj2RUmoaG8FPy-PdC974SdR-IEpSbi7XXkNo7uOVBGhQqSjLRv_7I0CVoH_2EVtzpwverKOhL7zEU1YrfhfGaSl72QQ5EO4oAX0yQYsztHwQXm6GJoKOIlY_awlx6v26qEMxuy52MjUTmF6yoQtCMkca3J3_lpVajGejWd80jWkIMe61vQVC7aJzr6Zdd3-xqJQb2iAXmotjbiyiau5RMuaszclsaN_trhIv8P5mtuykUNf5Sx_kJT7Q6XK92Eh4G6_DKN8O8rr63HdNuX8v_Oc6VfR0Oftp8ZMd9kLOVJMy8D2TuR5GPG9I6q-RoNJLAUIn62E8b2mKybmEPqXxTcZjjaWDG_I-4cSgXRaXQbr5xz9ql8k6ExdyZf3lNc7MtsBVA9Dt2atBZtP8JIH4j4yT96M-oZ7T7BWkktjVzj4sF2ItNDsWB7KPfKxjNOPyw4dxl99DpqeWlGspxvCpizp4_UsM46bvQlqy438BOUxd6Hab-S-0zRsG9BMmk_vzA6DClSd4YBemipc9uMG2ufgnL6bJTPxycw07CTjBiZ-4RHmoV-izThYZtQ4OuLbt-2f_zmqSQElDeJUEy5mWqPk1N1T2kcqD_dMb8wb907WP8w__d_lBXZaVoGAAA=.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUQtUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOmZhbHNlfX0=",
                        tokenType: models.TokenType.Embed,
                        settings: {
                            panes: {
                                filters: {
                                    expanded: false,
                                    visible: false
                                }
                            },
                            background: models.BackgroundType.Transparent,
                        }
                    }}

                    eventHandlers = { 
                        new Map([
                            ['loaded', function () {console.log('Report loaded');}],
                            ['rendered', function () {console.log('Report rendered');}],
                            ['error', function (event) {console.log(event.detail);}]
                        ])
                    }
                        
                    cssClassName = { "interface__report" }

                    getEmbeddedComponent = { (embeddedReport) => {
                        window.report = embeddedReport;
                    }}
                />
                {report && <img src={bg} className="interface__report" alt="Отчет Power BI" title="Отчет Power BI" />}
            </main>
        </div>
    ); 
}

export default User;
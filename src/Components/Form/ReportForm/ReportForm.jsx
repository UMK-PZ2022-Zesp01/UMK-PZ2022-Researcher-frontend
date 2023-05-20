import { GrClose } from 'react-icons/gr';
import styles from './ReportForm.module.css';
import getApiUrl from "../../../Common/Api";
import {useState} from "react";
import useAuth from "../../../hooks/useAuth";

const ReportForm = ({ open, onClose, setAlert }) => {
    const [reportContent, setReportContent] = useState('');
    const REPORT_URL=`${getApiUrl()}report/send`
    const { username, accessToken } = useAuth().auth;

    const handleReportContent = content => {
        setReportContent(content);
    };

    const handleSend = async content => {
        if (reportContent.length) {
            let putTemplate = {
                reportMessage: reportContent,
            };
            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'application/json; charset:UTF-8',
                },
                body: JSON.stringify(putTemplate),
            };
            const response = await fetch(REPORT_URL, requestOptions);
            if (response.ok) {
                setAlert({alertOpen: true,
                    alertType: 204,
                    alertText: 'Dziękujemy za zgłoszenie błędu, postaramy się go naprawić',})
            }
            else{
                setAlert({alertOpen: true,
                    alertType: 500,
                    alertText: 'Coś poszło nie tak, spróbuj ponownie później',})
            }
        }
    };

    if (!open) return null;
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.popupContainer}
                onClick={e => {
                    e.stopPropagation();
                }}
            >
                <GrClose
                    onClick={() => {
                        onClose();
                        window.document.body.style.overflowY = `visible`;
                    }}
                    className={styles.closeBtn}
                />
                <h1>Ups! Coś nie działa?</h1>
                <h3>Wyślij nam wiadomość, postaramy się to poprawić!</h3>
                <textarea onChange={event => {
                    handleReportContent(event.target.value);
                }} className={styles.bugInput}></textarea>
                <button className={styles.bugBtn} onClick={()=>{
                    handleSend();
                    onClose();
                }}>
                    ZGŁOŚ BŁĄD
                </button>
            </div>
        </div>
    );
};

export { ReportForm };

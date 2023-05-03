import styles from './ResearchEditor.module.css';
import { useState } from 'react';

function ResearchEditor({ research }) {
    const [title, setTitle] = useState(research.title);
    const [description, setDescription] = useState(research.description);
    const [creatorEmail, setCreatorEmail] = useState(research.creatorEmail);
    const [creatorPhone, setCreatorPhone] = useState(research.creatorPhone);
    const [participantLimit, setParticipantLimit] = useState(research.participantLimit);

    const researchEditData = {
        title: title,
        description: description,
        creatorEmail: creatorEmail,
        creatorPhone: creatorPhone,
        participantLimit: participantLimit,
    };

    return (
        <section className={styles.editorContainer}>
            <div className={styles.editorRow}>
                <div className={styles.editorColumn}>
                    <input
                        type="text"
                        placeholder="Tytuł"
                        defaultValue={research.title}
                        onChange={e => setTitle(() => e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Limit uczestników"
                        defaultValue={research.participantLimit}
                        onChange={e => setParticipantLimit(() => e.target.value)}
                    />
                </div>

                <textarea
                    className={styles.editorTextArea}
                    placeholder="Opis"
                    defaultValue={research.description}
                    onChange={e => setDescription(() => e.target.value)}
                />
            </div>

            <input
                type="email"
                placeholder="Kontaktowy adres e-mail"
                defaultValue={research.creatorEmail}
                onChange={e => setCreatorEmail(() => e.target.value)}
            />
            <input
                type="text"
                placeholder="Kontaktowy numer telefonu"
                pattern="[0-9]{3}[ -]?[0-9]{3}[ -]?[0-9]{3}"
                defaultValue={research.creatorPhone}
                onChange={e => setCreatorPhone(() => e.target.value)}
            />
        </section>
    );
}

export { ResearchEditor };

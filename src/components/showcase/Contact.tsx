import React, { useEffect, useState } from 'react';
import colors from '../../constants/colors';
import ghIcon from '../../assets/pictures/contact-gh.png';
import inIcon from '../../assets/pictures/contact-in.png';
import ResumeDownload from './ResumeDownload';
import profile from '../../constants/profile';

export interface ContactProps {}

// #ff0000 on white is 4.0:1; this red reaches 5.9:1 for the small error text.
const ERROR_RED = '#c00000';

// function to validate email
const validateEmail = (email: string) => {
    const re =
        // eslint-disable-next-line
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

interface SocialBoxProps {
    icon: string;
    link: string;
    label: string;
}

// Icon-only link: the accessible name comes from `label`.
const SocialBox: React.FC<SocialBoxProps> = ({ link, icon, label }) => {
    return (
        <a
            rel="noreferrer"
            target="_blank"
            href={link}
            aria-label={`${label} (se abre en una pestaña nueva)`}
        >
            <div className="big-button-container" style={styles.social}>
                <img src={icon} alt="" style={styles.socialImage} />
            </div>
        </a>
    );
};

const Contact: React.FC<ContactProps> = (props) => {
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [formMessage, setFormMessage] = useState('');
    const [formMessageColor, setFormMessageColor] = useState('');
    const [showErrors, setShowErrors] = useState(false);

    useEffect(() => {
        if (validateEmail(email) && name.length > 0 && message.length > 0) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [email, name, message]);

    // No backend yet: hand the message to the visitor's mail client.
    function submitForm() {
        if (!isFormValid) {
            setShowErrors(true);
            setFormMessage('Revisa los campos marcados e inténtalo de nuevo.');
            setFormMessageColor(ERROR_RED);
            return;
        }
        const subject = `Contacto desde el portafolio: ${name}${
            company ? ` (${company})` : ''
        }`;
        const body = `${message}\n\n${name}\n${email}`;
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;
        setFormMessage(`¡Gracias ${name}! Se abrirá tu cliente de correo.`);
        setFormMessageColor(colors.blue);
    }

    useEffect(() => {
        if (formMessage.length > 0) {
            setTimeout(() => {
                setFormMessage('');
                setFormMessageColor('');
            }, 4000);
        }
    }, [formMessage]);

    return (
        <main className="site-page-content">
            <div style={styles.header}>
                <h1>Contacto</h1>
                <div style={styles.socials}>
                    <SocialBox
                        icon={ghIcon}
                        link={profile.github}
                        label="GitHub"
                    />
                    {profile.linkedin && (
                        <SocialBox
                            icon={inIcon}
                            link={profile.linkedin}
                            label="LinkedIn"
                        />
                    )}
                </div>
            </div>
            <div className="text-block">
                <p>
                    Estoy disponible para proyectos freelance. Si tienes una
                    oportunidad o una idea, escríbeme, ¡me encantaría conversar!
                    Puedes contactarme por correo, por WhatsApp o con el
                    formulario de abajo.
                </p>
                <br />
                <p>
                    <b>Correo: </b>
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </p>
                <p>
                    <b>WhatsApp: </b>
                    <a rel="noreferrer" target="_blank" href={profile.whatsapp}>
                        {profile.phoneDisplay}
                    </a>
                </p>
                {profile.instagram && (
                    <p>
                        <b>Instagram: </b>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={profile.instagram}
                        >
                            {profile.instagram
                                .replace(/\/$/, '')
                                .split('/')
                                .pop()}
                        </a>
                    </p>
                )}

                <form
                    style={styles.form}
                    noValidate
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitForm();
                    }}
                >
                    <label htmlFor="contact-name">
                        <p>
                            {!name && (
                                <span style={styles.star} aria-hidden="true">
                                    *
                                </span>
                            )}
                            <b>Tu nombre:</b>
                        </p>
                    </label>
                    <input
                        id="contact-name"
                        style={styles.formItem}
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        aria-invalid={showErrors && !name}
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="contact-email">
                        <p>
                            {!validateEmail(email) && (
                                <span style={styles.star} aria-hidden="true">
                                    *
                                </span>
                            )}
                            <b>Correo:</b>
                        </p>
                    </label>
                    <input
                        id="contact-email"
                        style={styles.formItem}
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        aria-invalid={showErrors && !validateEmail(email)}
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="contact-company">
                        <p>
                            <b>Empresa (opcional):</b>
                        </p>
                    </label>
                    <input
                        id="contact-company"
                        style={styles.formItem}
                        type="text"
                        name="company"
                        autoComplete="organization"
                        placeholder="Empresa"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    <label htmlFor="contact-message">
                        <p>
                            {!message && (
                                <span style={styles.star} aria-hidden="true">
                                    *
                                </span>
                            )}
                            <b>Mensaje:</b>
                        </p>
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        required
                        aria-invalid={showErrors && !message}
                        placeholder="Mensaje"
                        style={styles.formItem}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div style={styles.buttons}>
                        {/* Not disabled: a disabled button cannot be focused,
                            so keyboard users would never learn what is missing. */}
                        <button
                            className="site-button"
                            style={styles.button}
                            type="submit"
                        >
                            Enviar mensaje
                        </button>
                        <div style={styles.formInfo}>
                            <p
                                role="status"
                                style={Object.assign(
                                    {},
                                    { color: formMessageColor }
                                )}
                            >
                                <b>
                                    <sub>
                                        {formMessage
                                            ? `${formMessage}`
                                            : ' El mensaje se abre en tu correo, dirigido a mí'}
                                    </sub>
                                </b>
                            </p>
                            <p>
                                <sub>
                                    {!isFormValid ? (
                                        <span>
                                            <b style={styles.star}>*</b> =
                                            obligatorio
                                        </span>
                                    ) : (
                                        '\xa0'
                                    )}
                                </sub>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
            <ResumeDownload altText="¿Necesitas una copia de mi hoja de vida?" />
        </main>
    );
};

const styles: StyleSheetCSS = {
    form: {
        // <form> does not get the global `div { display: flex }` rule.
        display: 'flex',
        flexDirection: 'column',
        marginTop: 32,
    },
    formItem: {
        marginTop: 4,
        marginBottom: 16,
    },
    socialImage: {
        width: 36,
        height: 36,
    },
    buttons: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    formInfo: {
        textAlign: 'right',

        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingLeft: 24,
    },
    star: {
        paddingRight: 4,
        color: ERROR_RED,
    },
    button: {
        minWidth: 184,
        height: 32,
    },
    header: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    socials: {
        marginBottom: 16,
        justifyContent: 'flex-end',
    },
    social: {
        width: 4,
        height: 4,
        // borderRadius: 1000,

        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
};

export default Contact;

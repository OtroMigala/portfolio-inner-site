import React, { useEffect, useState } from 'react';
import colors from '../../constants/colors';
import ghIcon from '../../assets/pictures/contact-gh.png';
import inIcon from '../../assets/pictures/contact-in.png';
import ResumeDownload from './ResumeDownload';
import { useLocale } from '../../i18n';
import Inline from '../../content/Inline';

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
    const { t } = useLocale();
    return (
        <a
            rel="noreferrer"
            target="_blank"
            href={link}
            aria-label={`${label} ${t('newTab')}`}
        >
            <div className="big-button-container" style={styles.social}>
                <img src={icon} alt="" style={styles.socialImage} />
            </div>
        </a>
    );
};

const SOCIAL_ICONS: Record<string, string> = { github: ghIcon, linkedin: inIcon };

const Contact: React.FC<ContactProps> = (props) => {
    const { t, content } = useLocale();
    const contact = content.contact;
    const instagram = contact.links.find((l) => l.kind === 'instagram');
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
            setFormMessage(t('contact.invalid'));
            setFormMessageColor(ERROR_RED);
            return;
        }
        const subject = t('contact.subject', {
            name: company ? `${name} (${company})` : name,
        });
        const body = `${message}\n\n${name}\n${email}`;
        window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;
        setFormMessage(t('contact.thanks', { name }));
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
        <div className="site-page-content">
            <div style={styles.header}>
                <h1>{t('contact.title')}</h1>
                <div style={styles.socials}>
                    {contact.links
                        .filter((l) => SOCIAL_ICONS[l.kind])
                        .map((l) => (
                            <SocialBox
                                key={l.url}
                                icon={SOCIAL_ICONS[l.kind]}
                                link={l.url}
                                label={l.label}
                            />
                        ))}
                </div>
            </div>
            <div className="text-block">
                <p>
                    <Inline text={contact.intro} /> {t('contact.how')}
                </p>
                <br />
                <p>
                    <b>{t('contact.email')} </b>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
                <p>
                    <b>{t('contact.whatsapp')} </b>
                    <a rel="noreferrer" target="_blank" href={contact.whatsappUrl}>
                        {contact.phoneDisplay}
                        <span className="visually-hidden"> {t('newTab')}</span>
                    </a>
                </p>
                {instagram && (
                    <p>
                        <b>{t('contact.instagram')} </b>
                        <a rel="noreferrer" target="_blank" href={instagram.url}>
                            {instagram.url.replace(/\/$/, '').split('/').pop()}
                            <span className="visually-hidden"> {t('newTab')}</span>
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
                            <b>{t('contact.name')}</b>
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
                        placeholder={t('contact.namePlaceholder')}
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
                            <b>{t('contact.emailLabel')}</b>
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
                        placeholder={t('contact.emailPlaceholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="contact-company">
                        <p>
                            <b>{t('contact.company')}</b>
                        </p>
                    </label>
                    <input
                        id="contact-company"
                        style={styles.formItem}
                        type="text"
                        name="company"
                        autoComplete="organization"
                        placeholder={t('contact.companyPlaceholder')}
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
                            <b>{t('contact.message')}</b>
                        </p>
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        required
                        aria-invalid={showErrors && !message}
                        placeholder={t('contact.messagePlaceholder')}
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
                            {t('contact.send')}
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
                                            : ` ${t('contact.hint')}`}
                                    </sub>
                                </b>
                            </p>
                            <p>
                                <sub>
                                    {!isFormValid ? (
                                        <span>
                                            <b style={styles.star}>*</b> ={' '}
                                            {t('contact.required')}
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
            <ResumeDownload altText={t('contact.resumeQuestion')} />
        </div>
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

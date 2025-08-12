import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './Login.module.css';

const sendFormData = (formData) => {
    console.log(formData);
};

const fieldsSchema = yup.object()
    .shape({
        login: yup.string()
            .matches(/^[\w_]*$/, 'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание')
            .min(3, 'Неверный логин. Должно быть не меньше 3 символов')
            .max(20, 'Неверный логин. Должно быть не больше 20 символов'),
    });

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: '',
        },
        resolver: yupResolver(fieldsSchema),
    });

    const loginError = errors.login?.message;

    return (
        <div className={styles.app}>
            <form onSubmit={handleSubmit(sendFormData)}>
                {loginError && <div className={styles.errorLabel}>{loginError}</div>}
                <input name="login" type="text" {...register('login')} />
                <button type="submit" disabled={!!loginError}>Отправить</button>
            </form>
        </div>
    );
};

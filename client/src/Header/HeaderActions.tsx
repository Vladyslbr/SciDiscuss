import React from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Link } from "react-router-dom";

type _loginBtn = {
    inputState: string;
    setInputState: (val: string) => void;
    onSubmit: () => void;
};

export const LoginBtn: React.FC<_loginBtn> = ({ inputState, setInputState, onSubmit }) => {

   return (
    <div className="dialog">
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <div className="header-actions-login">
                    <span>Login</span>
                </div>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="dialog-content">
                    <Dialog.Title className="dialog-title">Login</Dialog.Title>
                    <fieldset className="dialog-fieldset">
                        <span className="dialog-fieldset-label">Enter AOI</span>
                        <input value={inputState} onChange={e => setInputState(e.target.value)} className="dialog-fieldset-input" id="login-aoi" placeholder="AOI::<publicId>..." />
                    </fieldset>
                    <div className="dialog-btn__wrapper">
                        <Dialog.Close asChild>
                            <Link to={"/author/submit"}>
                                <div className="dialog-create-profile">
                                    <span>Create profile?</span>
                                </div>
                            </Link>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                            <button onClick={onSubmit} type="submit" className="dialog-btn">Login</button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button type="button" className="dialog-close-btn" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    </div>
   );
};

type _logoutBtn = {
    onClick: () => void;
};

export const LogoutBtn: React.FC<_logoutBtn> = ({ onClick }) => {

    return (
        <div onClick={onClick} className="header-actions-login">
            <span>Logout</span>
        </div>
    );
}

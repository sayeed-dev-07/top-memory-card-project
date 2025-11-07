import React from 'react';

const Modal = ({ score, bestScore }) => {
    return (
        <>
            <dialog  id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold pb-4 text-2xl">OOPS GAME OVER!!!</h3>
                    <p className=" text-xl font-semibold">Game Score : {score}</p>
                    <p className="py-1 text-xl font-semibold">Best Score : {bestScore}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold pb-2 text-2xl">Congratulations! You Completed The Game !!!</h3>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
};

export default Modal;
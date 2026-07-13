import { Toast } from "react-bootstrap"


type Props = {
    show: boolean;
    message: string;
    onClose: () => void;
}

function AddedToFavorite({show,message,onClose}:Props) {
  return (
   <div
    className="position-fixed bottom-0 end-0 p-3"
    style={{ zIndex: 1055 }}
>
    <Toast
        show={show}
        onClose={onClose}
        autohide
        delay={2000}
    >
        <Toast.Header>
            <strong className="me-auto">Favorites</strong>
        </Toast.Header>

        <Toast.Body>{message}</Toast.Body>
    </Toast>
</div>
  );
}

export default AddedToFavorite;
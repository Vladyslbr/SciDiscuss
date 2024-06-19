import { getKeyPair } from "../../utils/crypto";

type _generatePairs = {
   PublicKeyState: {
      publicKey: string;
      setPublicKey: (val: string) => void;
   };
   PrivateKeyState: {
      privateKey: string;
      setPrivateKey: (val: string) => void;
   };
};

export const GeneratePairs: React.FC<_generatePairs> = ({
   PublicKeyState,
   PrivateKeyState,
}) => {
   const handleGeneratePair = () => {
      const { pair, publicKey, privateKey } = getKeyPair();

      PublicKeyState.setPublicKey(publicKey);
      PrivateKeyState.setPrivateKey(privateKey);
   };

   return (
      <div className="generate-pairs">
         <p className="generate-pairs-title">Public key:</p>
         <p className="generate-pairs-item-public">
            {PublicKeyState.publicKey}
         </p>
         <p className="generate-pairs-title">Private key:</p>
         <p className="generate-pairs-item-private">
            {PrivateKeyState.privateKey}
         </p>
         <button onClick={handleGeneratePair} type="button">
            Generate pair
         </button>
      </div>
   );
};

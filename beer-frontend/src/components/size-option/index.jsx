import './style.css';

const SizeOption = ({ sku, selected, onClick }) => {
  return (
    <div
      className="option"
      data-selected={selected}
      onClick={() => onClick(sku.code)}
    >
      {sku.name}
    </div>
  );
};

export default SizeOption;

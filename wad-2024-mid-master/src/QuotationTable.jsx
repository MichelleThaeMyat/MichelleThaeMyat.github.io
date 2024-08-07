import { Container, Button, Table } from "react-bootstrap";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import PropTypes from 'prop-types';
import style from "./mystyle.module.css";

function QuotationTable({ data, clearDataItems, deleteByIndex }) {
  if (!data || data.length === 0) {
    return (
      <Container>
        <h1>Quotation</h1>
        <p><CiShoppingCart /> No items</p>
      </Container>
    );
  }

  const calculateAmount = (price, qty, discount) => price * qty - discount;
  const totalDiscount = data.reduce((acc, v) => acc + v.discount, 0);
  const totalPrice = data.reduce((acc, v) => acc + calculateAmount(v.ppu, v.qty, v.discount), 0);

  const clearTable = () => {
    clearDataItems();
  };

  const handleDelete = (index) => {
    deleteByIndex(index);
  };

  return (
    <Container>
      <h1>Quotation</h1>
      <Button onClick={clearTable} variant="outline-dark">
        <MdClear /> Clear
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={style.textCenter}>Delete</th>
            <th className={style.textCenter}>Qty</th>
            <th className={style.textCenter}>Item</th>
            <th className={style.textCenter}>Price/Unit</th>
            <th className={style.textCenter}>Discount</th>
            <th className={style.textCenter}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => {
            const amount = calculateAmount(v.ppu, v.qty, v.discount);
            return (
              <tr key={i}>
                <td className={style.textCenter}>
                  <BsFillTrashFill onClick={() => handleDelete(i)} />
                </td>
                <td className={style.textCenter}>{v.qty}</td>
                <td>{v.item}</td>
                <td className={style.textCenter}>{v.ppu}</td>
                <td className={style.textRight}>{v.discount.toFixed(2)}</td>
                <td className={style.textRight}>{amount.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className={style.textRight}>
              Total Discount
            </td>
            <td className={style.textRight}>{totalDiscount.toFixed(2)}</td>
            <td className={style.textRight}>{totalPrice.toFixed(2)}</td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

QuotationTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.string.isRequired,
      ppu: PropTypes.number.isRequired,
      qty: PropTypes.number.isRequired,
      discount: PropTypes.number.isRequired,
    })
  ).isRequired,
  clearDataItems: PropTypes.func.isRequired,
  deleteByIndex: PropTypes.func.isRequired,
};

export default QuotationTable;
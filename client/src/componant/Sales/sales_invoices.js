import React, { useState, useRef } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  message,
} from 'antd';
import {
  PlusOutlined,
  PrinterOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const { Item } = Form;

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);

  const [form] = Form.useForm();
  const invoiceRef = useRef();

  // Create Invoice submit handler
  const onFinish = values => {
    if (!values.items || values.items.length === 0) {
      message.error('Add at least one item');
      return;
    }

    // Calculate totals
    const subtotal = values.items.reduce((sum, i) => sum + i.qty * i.price, 0);
    const discountAmount = (values.discount || 0) / 100 * subtotal;
    const additionalDiscountAmount = (values.additionalDiscount || 0) / 100 * (subtotal - discountAmount);
    const totalAfterDiscounts = subtotal - discountAmount - additionalDiscountAmount;
    const gstAmount = (values.gst || 0) / 100 * totalAfterDiscounts;
    const grandTotal = totalAfterDiscounts + gstAmount;

    const invoiceData = {
      id: Date.now(),
      customer: values.customer,
      items: values.items,
      discount: values.discount || 0,
      additionalDiscount: values.additionalDiscount || 0,
      gst: values.gst || 0,
      subtotal,
      discountAmount,
      additionalDiscountAmount,
      totalAfterDiscounts,
      gstAmount,
      grandTotal,
      date: new Date().toLocaleDateString(),
    };

    setInvoices(prev => [invoiceData, ...prev]);
    message.success('Invoice created');
    form.resetFields();
    setModalVisible(false);
  };

  // Show invoice detail modal
  const showInvoiceDetails = invoice => {
    setCurrentInvoice(invoice);
    setDetailVisible(true);
  };

  // Print invoice
  const handlePrint = () => {
    if (!invoiceRef.current) return;
    const printContents = invoiceRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // reload react app
  };

  // Download PDF
  const handleDownloadPDF = () => {
    if (!invoiceRef.current) return;

    html2canvas(invoiceRef.current, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice_${currentInvoice.id}.pdf`);
    }).catch(() => {
      message.error('Failed to generate PDF');
    });
  };

  const columns = [
    {
      title: 'Invoice ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Grand Total (₹)',
      dataIndex: 'grandTotal',
      key: 'grandTotal',
      render: text => text.toFixed(2),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showInvoiceDetails(record)}>
            View
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Invoices</h1>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Create New Invoice
      </Button>

      <Table columns={columns} dataSource={invoices} rowKey="id" />

      {/* Create Invoice Modal */}
      <Modal
        title="Create Invoice"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ items: [{ item: '', qty: 1, price: 0 }] }}>
          <Item label="Customer" name="customer" rules={[{ required: true }]}>
            <Input placeholder="Customer Name" />
          </Item>

          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'item']}
                      rules={[{ required: true, message: 'Missing item name' }]}
                    >
                      <Input placeholder="Item" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'qty']}
                      rules={[{ required: true, message: 'Missing quantity' }]}
                    >
                      <InputNumber min={1} placeholder="Qty" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'price']}
                      rules={[{ required: true, message: 'Missing price' }]}
                    >
                      <InputNumber
                        min={0}
                        placeholder="Price"
                        formatter={value => `₹ ${value}`}
                        parser={value => value.replace(/\₹\s?|(,*)/g, '')}
                      />
                    </Form.Item>
                    <Button danger onClick={() => remove(name)}>
                      Remove
                    </Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Item
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Item label="Discount (%)" name="discount" initialValue={0}>
            <InputNumber min={0} max={100} />
          </Item>
          <Item label="Additional Discount (%)" name="additionalDiscount" initialValue={0}>
            <InputNumber min={0} max={100} />
          </Item>
          <Item label="GST (%)" name="gst" initialValue={18}>
            <InputNumber min={0} max={100} />
          </Item>

          <Item>
            <Button type="primary" htmlType="submit" block>
              Create Invoice
            </Button>
          </Item>
        </Form>
      </Modal>

      {/* Invoice Detail Modal */}
      <Modal
        title="Invoice Detail"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={[
          <Button key="print" icon={<PrinterOutlined />} onClick={handlePrint}>
            Print
          </Button>,
          <Button key="download" icon={<DownloadOutlined />} onClick={handleDownloadPDF}>
            Download PDF
          </Button>,
          <Button key="close" onClick={() => setDetailVisible(false)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {currentInvoice && (
          <div ref={invoiceRef} style={{ fontFamily: "'Courier New', Courier, monospace", padding: 20, border: '1px solid #000', borderRadius: 8 }}>
            <h2 style={{ textAlign: 'center' }}>INVOICE</h2>

            <p><b>Invoice ID:</b> {currentInvoice.id}</p>
            <p><b>Date:</b> {currentInvoice.date}</p>
            <p><b>Customer:</b> {currentInvoice.customer}</p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #000', padding: 6 }}>Item</th>
                  <th style={{ border: '1px solid #000', padding: 6 }}>Qty</th>
                  <th style={{ border: '1px solid #000', padding: 6 }}>Price (₹)</th>
                  <th style={{ border: '1px solid #000', padding: 6 }}>Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                {currentInvoice.items.map((item, i) => (
                  <tr key={i}>
                    <td style={{ border: '1px solid #000', padding: 6 }}>{item.item}</td>
                    <td style={{ border: '1px solid #000', padding: 6, textAlign: 'right' }}>{item.qty}</td>
                    <td style={{ border: '1px solid #000', padding: 6, textAlign: 'right' }}>{item.price.toFixed(2)}</td>
                    <td style={{ border: '1px solid #000', padding: 6, textAlign: 'right' }}>{(item.qty * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table style={{ width: '100%', marginTop: 10 }}>
              <tbody>
                <tr>
                  <td>Subtotal:</td>
                  <td style={{ textAlign: 'right' }}>₹ {currentInvoice.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Discount ({currentInvoice.discount}%):</td>
                  <td style={{ textAlign: 'right' }}>- ₹ {currentInvoice.discountAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Additional Discount ({currentInvoice.additionalDiscount}%):</td>
                  <td style={{ textAlign: 'right' }}>- ₹ {currentInvoice.additionalDiscountAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Total After Discounts:</td>
                  <td style={{ textAlign: 'right' }}>₹ {currentInvoice.totalAfterDiscounts.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>GST ({currentInvoice.gst}%):</td>
                  <td style={{ textAlign: 'right' }}>+ ₹ {currentInvoice.gstAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td><b>Grand Total:</b></td>
                  <td style={{ textAlign: 'right', fontWeight: 'bold' }}>₹ {currentInvoice.grandTotal.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <p style={{ marginTop: 30, textAlign: 'center' }}>Thank you for your business!</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InvoicesPage;

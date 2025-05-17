import React from 'react'
import DashboardNavBar from '../DashboardNavBar/DashboardNavBar'
import Sidebar from '../../Sidebar/Sidebar'
import StockAnalasysSection from '../charts/StockAnalasysSection'
import { navOptions } from '../../Navdata/dashboardNavData'
import ItemTable from '../../Table/Table'
import { Button, Input } from 'antd'
import { AiOutlineCar, AiOutlineOrderedList, AiOutlineSearch, AiOutlineTruck } from 'react-icons/ai'
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { Steps } from 'antd';
import "./Stepbar.css"
import StepProgress from '../charts/StepProgress'
import { MdBusiness } from 'react-icons/md'
import { FaShippingFast } from 'react-icons/fa';


const InventoryPurchesUpdate = () => {

    const data = [
        {
            key: '1',
            order_id: 'ORD-1001',
            item: 'Engine Core Assembly',
            quantity: 20,
            date: '2025-05-10',
            status: 'Stored',
            statuses: [
                { step: 'order', time: '2025-05-14' },
                { step: 'delivered', time: '2025-05-15' },
            ],
            category: 'Mechanical',
            vendor: {
                name: 'Industrial Bearings Ltd.',
                contact: '+91 98123 45678',
                email: 'support@indbearings.in',
                location: 'Pune, Maharashtra',
            },
            logistics: {
                transporter: 'BlueDart Logistics',
                trackingId: 'BDL-775342',
                expectedDelivery: '2025-05-18',
                mode: 'Air Cargo',
            },
            location: 'Mumbai',
            department: 'Assembly',
            specification: 'Assembled',
            rejectQtn: 1,
            paymentInfo: {
                totalAmount: 12000,
                totalAdvance: 50000, // Example total advance payment
                remainingBalance: 20000, // Example remaining balance
                paymentDate: '2025-05-10', // Example payment date
            },
        },
        {
            key: '2',
            order_id: 'ORD-1002',
            item: 'Battery Unit Pack',
            quantity: 50,
            date: '2025-05-09',
            statuses: [
                { step: 'order', time: '2025-05-13' },
                { step: 'delivered', time: '2025-05-14' },
                { step: 'quality check', time: '2025-05-15' },
                { step: 'quantity check', time: '2025-05-16' },
            ],
            category: 'Electrical',
            vendor: {
                name: 'Industrial Bearings Ltd.',
                contact: '+91 98123 45678',
                email: 'support@indbearings.in',
                location: 'Pune, Maharashtra',
            },
            logistics: {
                transporter: 'BlueDart Logistics',
                trackingId: 'BDL-775342',
                expectedDelivery: '2025-05-18',
                mode: 'Air Cargo',
            },
            location: 'Pune',
            department: 'Testing',
            specification: 'In Progress',
            rejectQtn: 0,
            paymentInfo: {
                totalAmount: 12000,
                totalAdvance: 70000, // Example total advance payment
                remainingBalance: 30000, // Example remaining balance
                paymentDate: '2025-05-09', // Example payment date
            },
        },
        {
            key: '3',
            order_id: 'ORD-1003',
            item: 'Control Panel System',
            quantity: 15,
            date: '2025-05-07',
            statuses: [
                { step: 'order', time: '2025-05-10' },
                { step: 'delivered', time: '2025-05-11' },
                { step: 'quality check', time: '2025-05-12' },
                { step: 'quantity check', time: '2025-05-13' },
                { step: 'stored', time: '2025-05-14' },
            ],
            category: 'Electronic',
            vendor: {
                name: 'Global Steel Supplies',
                contact: '+91 98765 43210',
                email: 'sales@globalsteel.com',
                location: 'Guwahati, Assam',
            },
            logistics: {
                transporter: 'NorthEast Cargo Movers',
                trackingId: 'NECM-458923',
                expectedDelivery: '2025-05-16',
                mode: 'Road Freight',
            },
            location: 'Delhi',
            department: 'Dispatch',
            specification: 'Dispatched',
            rejectQtn: 0,
            paymentInfo: {
                totalAmount: 12000,
                totalAdvance: 60000, // Example total advance payment
                remainingBalance: 25000, // Example remaining balance
                paymentDate: '2025-05-07', // Example payment date
            },
        },
        {
            key: '4',
            order_id: 'ORD-1004',
            item: 'Fuel Tank',
            quantity: 30,
            date: '2025-05-06',
            statuses: [
                { step: 'order', time: '2025-05-14' },
            ],
            category: 'Structural',
            vendor: {
                name: 'Global Steel Supplies',
                contact: '+91 98765 43210',
                email: 'sales@globalsteel.com',
                location: 'Guwahati, Assam',
            },
            logistics: {
                transporter: 'NorthEast Cargo Movers',
                trackingId: 'NECM-458923',
                expectedDelivery: '2025-05-16',
                mode: 'Road Freight',
            },
            location: 'Chennai',
            department: 'Receiving',
            specification: 'Received',
            rejectQtn: 2,
            paymentInfo: {
                totalAmount: 12000,
                totalAdvance: 80000, // Example total advance payment
                remainingBalance: 40000, // Example remaining balance
                paymentDate: '2025-05-06', // Example payment date
            },
        },
        {
            key: '5',
            order_id: 'ORD-1005',
            item: 'Alternator Coil',
            quantity: 10,
            date: '2025-05-05',
            statuses: [
                { step: 'order', time: '2025-05-12' },
                { step: 'delivered', time: '2025-05-13' },
                { step: 'quality check', time: '2025-05-14' },
            ],
            category: 'Electrical',
            vendor: {
                name: 'Industrial Bearings Ltd.',
                contact: '+91 98123 45678',
                email: 'support@indbearings.in',
                location: 'Pune, Maharashtra',
            },
            logistics: {
                transporter: 'BlueDart Logistics',
                trackingId: 'BDL-775342',
                expectedDelivery: '2025-05-18',
                mode: 'Air Cargo',
            },
            location: 'Bangalore',
            department: 'Inspection',
            specification: 'Pending Inspection',
            rejectQtn: 1,
            paymentInfo: {
                totalAmount: 12000,
                totalAdvance: 30000, // Example total advance payment
                remainingBalance: 15000, // Example remaining balance
                paymentDate: '2025-05-05', // Example payment date
            },
        },
        {
            key: '6',
            order_id: 'ORD-1006',
            item: 'Alternator Coil',
            quantity: 10,
            date: '2025-05-05',
            statuses: [
                { step: 'order', time: '2025-05-12' },
                { step: 'delivered', time: '2025-05-13' },
                { step: 'quality check', time: '2025-05-14' },
            ],
            category: 'Electrical',
            vendor: {
                name: 'Industrial Bearings Ltd.',
                contact: '+91 98123 45678',
                email: 'support@indbearings.in',
                location: 'Pune, Maharashtra',
            },
            logistics: {
                transporter: 'BlueDart Logistics',
                trackingId: 'BDL-775342',
                expectedDelivery: '2025-05-18',
                mode: 'Air Cargo',
            },
            location: 'Bangalore',
            department: 'Inspection',
            specification: 'Pending Inspection',
            rejectQtn: 1,
            paymentInfo: {
                totalAmount: 12000,
                totalAdvance: 30000, // Example total advance payment
                remainingBalance: 15000, // Example remaining balance
                paymentDate: '2025-05-05', // Example payment date
            },
        },
    ];


    const columns = [
        {
            title: 'Order Id',
            dataIndex: 'order_id',
            key: 'order_id',

        },
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            fixed: 'left',

            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        autoFocus
                        placeholder="Search Name"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon={<AiOutlineSearch />}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </div>
            ),
            onFilter: (value, record) => record.item.toLowerCase().includes(value.toLowerCase()),

        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',

        },
        {
            title: 'Order Date',
            dataIndex: 'date',
            key: 'date',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <DatePicker
                        autoFocus
                        value={selectedKeys[0] ? dayjs(selectedKeys[0]) : null}
                        onChange={(date, dateString) =>
                            setSelectedKeys(dateString ? [dateString] : [])
                        }
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon={<AiOutlineSearch />}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters()}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </div>
            ),
            onFilter: (value, record) => {
                // Assuming record.date is a string in 'YYYY-MM-DD' format
                return dayjs(record.date).isSame(dayjs(value), 'day');
            },
        },
        {
            title: 'Status',
            dataIndex: 'statuses',
            key: 'status',

            filters: [...new Set(data.map(item => item.statuses.at(-1)?.step))].map(step => ({
                text: String(step),
                value: step
            })),

            onFilter: (value, record) => record.statuses.at(-1)?.step === value,

            render: (statuses) => {
                const rawStatus = statuses.at(-1)?.step?.trim().toLowerCase();
                let color = '#d9d9d9'; // default

                switch (rawStatus) {
                    case 'stored':
                        color = '#52c41a';
                        break;
                    case 'quantity check':
                        color = '#faad14';
                        break;
                    case 'order':
                        color = '#1890ff';
                        break;
                    case 'delivered':
                        color = '#13c2c2';
                        break;
                    case 'quality check':
                        color = '#faad14';
                        break;
                    default:
                        break;
                }

                return (
                    <span
                        style={{
                            backgroundColor: color,
                            color: '#fff',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontWeight: 500
                        }}
                    >
                        {statuses.at(-1)?.step || 'N/A'}
                    </span>
                );
            }
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',

            filters: [...new Set(data.map(item => item.category))].map(id => ({ text: String(id), value: id })),
            onFilter: (value, record) => record.category === value,

        },
        {
            title: 'Vendor',
            dataIndex: 'vendor',
            key: 'vendor',
            filters: [
                ...new Set(data.map(item => item.vendor?.name)).values()
            ].map(name => ({ text: name, value: name })),
            onFilter: (value, record) => record.vendor?.name === value,
            render: (vendor) => vendor?.name || '-',
        },
        {
            title: 'Reject Qtn',
            dataIndex: 'rejectQtn',
            key: 'rejectQtn',
            filters: [...new Set(data.map(item => item.rejectQtn))].map(id => ({ text: String(id), value: id })),
            onFilter: (value, record) => record.rejectQtn === value,
            render: (value) => (
                <span
                    style={{
                        backgroundColor: value > 0 ? '#ff4d4f' : 'transparent',
                        color: value > 0 ? '#fff' : '#000',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontWeight: value > 0 ? 600 : 400,
                    }}
                >
                    {value}
                </span>
            )
        }
    ];



    const ExpandedRowContent = ({ record }) => {
        const { vendor, logistics, order_id, paymentInfo } = record;
        const allSteps = ['order', 'delivered', 'quality check', 'quantity check', 'stored'];

        return (
            <div className="custom-expanded-row" key={record.key}>
                <h1 style={{ margin: 0, color: 'green' }}>{order_id}</h1>

                {/* Step progress component */}
                <StepProgress allSteps={allSteps} record={record} />

                {/* Order info */}
                <div className="deliveryDetails">
                    <h4>Order Info</h4>
                    <div className="orderInfoBoxContain">
                        <div className="orderinfoBox">
                            <div>
                                <h4> <MdBusiness /> Vendor Info</h4>
                                <span><strong>Name:</strong> {vendor?.name}</span><br />
                                <span><strong>Contact:</strong> {vendor?.contact}</span><br />
                                <span><strong>Email:</strong> {vendor?.email}</span><br />
                                <span><strong>Location:</strong> {vendor?.location}</span>
                            </div>
                            <div>
                                <h4> <FaShippingFast /> Logistic Information</h4>
                                <span><strong>Transporter:</strong> {logistics?.transporter}</span><br />
                                <span><strong>Tracking ID:</strong> {logistics?.trackingId}</span><br />
                                <span><strong>Expected Delivery:</strong> {logistics?.expectedDelivery}</span><br />
                                <span><strong>Mode:</strong> {logistics?.mode}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="paymentDetails">


                    <h3>Payment Info</h3>
                    <div className="paymentBox">
                        <div className="paymentItem">
                            <div className="label">Advance Payment :</div>
                            <div className="value">{paymentInfo?.totalAdvance}</div>
                        </div>
                        <div className="paymentItem">
                            <div className="label">Remaining Payment :</div>
                            <div className="value">{paymentInfo?.remainingBalance}</div>
                        </div>
                        <div className="paymentItem">
                            <div className="label">Total Amount :</div>
                            <div className="value">{paymentInfo?.totalAmount}</div>
                        </div>
                        <div className="paymentItem">
                            <div className="label">Payment Date :</div>
                            <div className="value">{paymentInfo?.paymentDate}</div>
                        </div>
                    </div>

                </div>


            </div>
        );
    };

    return (
        <div className='layoutContainer'>
            <Sidebar />


            <div className="dashboardContainerLayout">

                <DashboardNavBar navOptions={navOptions} />

                <StockAnalasysSection />
                <div className="storeDetailsTable">
                    <h3 className='h3Header'> <AiOutlineOrderedList />Raw Material Order List</h3>
                    <ItemTable renderExpandedRow={(record) => <ExpandedRowContent record={record} />} columns={columns} data={data} />
                </div>
            </div>

        </div>
    )
}

export default InventoryPurchesUpdate
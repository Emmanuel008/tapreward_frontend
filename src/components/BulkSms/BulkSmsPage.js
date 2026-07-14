import BulkSmsHeader from './BulkSmsHeader';
import BulkSmsForm from './BulkSmsForm';
import './BulkSmsPage.css';

function BulkSmsPage() {
  return (
    <div className="bulk-sms-page">
      <BulkSmsHeader />
      <BulkSmsForm />
    </div>
  );
}

export default BulkSmsPage;

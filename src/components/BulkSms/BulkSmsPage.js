import { useOutletContext } from 'react-router-dom';
import BulkSmsHeader from './BulkSmsHeader';
import BulkSmsForm from './BulkSmsForm';
import './BulkSmsPage.css';

function BulkSmsPage() {
  const { session } = useOutletContext();

  return (
    <div className="bulk-sms-page">
      <BulkSmsHeader session={session} />
      <BulkSmsForm />
    </div>
  );
}

export default BulkSmsPage;

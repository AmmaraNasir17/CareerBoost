import Badge from "../common/Badge";
import { APPLICATION_STATUS } from "../../utils/constants";

export default function ApplicationStatusBadge({ status }) {
  const config = APPLICATION_STATUS[status] || { label: status, variant: "gray" };
  return <Badge label={config.label} variant={config.variant} />;
}
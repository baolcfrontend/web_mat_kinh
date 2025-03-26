  let statusClass = "";
        switch (statusClass) {
            case "Đang chờ xử lý":
                statusClass = "pending";
                break;
            case "Đang giao hàng":
                statusClass = "shipping";
                break;
            case "Đã giao hàng":
                statusClass = "completed";
                break;
            case "Đã hủy":
                statusClass = "cancelled";
                break;
        }

console.log(statusClass);
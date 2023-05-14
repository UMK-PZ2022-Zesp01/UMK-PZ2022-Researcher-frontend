export default function AddressFormatter(address) {
    if (address === undefined || address == null || address === '') return null;
    const addressParts = address.toString().split(', ');
    return `${addressParts[1].toString().split(' ').at(1)}, ${addressParts[0]}`;
}

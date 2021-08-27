export default function formatForm(data) {
    const formatCpf = data.cpf.replace(/[^0-9]/g,'');
    const formatCep = data.address.cep.replace(/[^0-9]/g,'');
    const formatPhone = data.phone.replace(/[^0-9]/g,'');
    data.cpf = formatCpf;
    data.address.cep = formatCep;
    data.phone = formatPhone;
    
    return data;
  }
export const generatehtmltemplate=(requestId,UserName) =>{
  return `
  <div style="
  display: flex;         
    flex-direction: column;   
    align-items: center;      
    padding: 20px;              
    background-color: #f9f9f9;  
    border-radius: 10px;       
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 20px auto;          
  
  ">
  <p style="margin:10px 0 ; width:100%">${UserName} Request to have a closer look at your Property</p>
  <p style="margin:10px 0 ; width:100%">Click the button below to verify the user's request:</p>
<a href="http://localhost:8000/${requestId}" style="
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-radius: 5px;
  margin : 10px 0;
  width:100%
">
  Verify Request
</a>

<a href="http://localhost:8000/admin/approve-request/${requestId}" style="
  background-color: #28a745; 
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-radius: 5px;
  margin-right: 10px; 
  margin:10px 0 ;
  width:100%;
">
  Approve Request
</a>

<a href="http://localhost:8000/admin/reject-request/${requestId}" style="
  background-color: #dc3545; /* Red for reject */
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-radius: 5px;
  width:100%;
">
  Reject Request
</a>

  </div>


`}

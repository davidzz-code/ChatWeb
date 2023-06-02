

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.ArrayList;

/**
 * Servlet implementation class Friend
 */
@WebServlet("/Friend")
public class Friend extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public Friend() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String mail = request.getParameter("mail");
		String session = request.getParameter("session");
		String friendMail = request.getParameter("friend");
		
		User u = new User();
		u.setMail(mail);
		u.setSession(session);
		
		String resposta="0";
		//Codi resposta
		//0 El Servidor no respon
		//1 Amic afegit
		//2 Amic no trobat
		//3 Usuari necessita loggin
		
		if (u.isLogged()) {
			User friend = new User();
			friend.load(friendMail);
					
					
			if(friend.getUser()!=null) {
				
					if(u.setFriend(friend)) {
						resposta="1";
					}
			}else {
				resposta="2";
			}
		}else {
			resposta = "3";
		}
		response.getWriter().append(resposta);
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String mail = request.getParameter("mail");
		String session = request.getParameter("session");
		
		User u = new User();
		u.setMail(mail);
		u.setSession(session);
		
		String resposta ="[]";
		
		if (u.isLogged()) {
			resposta = u.getFriends();
		}
		response.getWriter().append(resposta);
	}
}

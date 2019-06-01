package rest.services;

import java.sql.SQLException;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;

import exceptions.DbException;
import exceptions.ServiceException;
import model.Category;
import model.DbConnection;
import model.dao.CategoryDao;

@Path("/categoryservice")
public class CategoryService {

	@POST
	//@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createCategory(Category entity) throws Exception {
		
		ResponseBuilder responseBuilder = null;
		DbConnection conn = null;
		
		try {
			conn = DbConnection.getInstance();
			CategoryDao dao = new CategoryDao(conn);
			entity = dao.insert(entity);
			responseBuilder = Response.status(Status.OK).entity(entity);
		} catch (DbException | SQLException e) {
			e.printStackTrace();
			ServiceException se = new ServiceException("An error occured.", e);
			responseBuilder = Response.status(Status.INTERNAL_SERVER_ERROR).entity(se.toJSON());
		} finally { 
			conn.close();
		}
		
		return responseBuilder.build();
	}

}

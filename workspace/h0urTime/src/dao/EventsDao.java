package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

import exceptions.DbException;
import model.Events;
import model.DbConnection;

public class EventsDao extends GenericDao<Events> {

	public EventsDao(DbConnection conn) {
		super(Events.class, "Events", conn);
	}
	
	@Override
	public Events insert(Events entity) throws DbException {
		if (!this.hasConnection()) 
			throw new DbException("No connection to Database");
		
		try {
			Whitelist whitelist = new Whitelist();
			String date = Jsoup.clean(entity.getDate(), whitelist);
			String title = Jsoup.clean(entity.getTitle(), whitelist);
			String description = Jsoup.clean(entity.getDescription(), whitelist);
			
			// NULL is working cause of NOT NULL AUTOINCREMENT combination
			// at primary key create table statement!!!
			String sql = "INSERT INTO " + this.tableName + " VALUES (NULL,?,?,?,?)";
			PreparedStatement preparedStatement = this.conn.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, date);
			preparedStatement.setString(2, title);
			preparedStatement.setString(3, description);
			preparedStatement.setInt(4, entity.getCategoryid());
			
			
			// get last auto generated id and assign to entity
			entity.setEventid(this.getLastAutoincrementId(preparedStatement));
			
			int affectedRows = preparedStatement.executeUpdate();
			
			// if no affected rows, show error
			if (affectedRows != 1) 
				throw new SQLException("Insert failed");
			
		} catch (SQLException e) {
			e.printStackTrace();
			throw new DbException("Could not insert entity=" + entity.toString(), e);
		}
		return entity;
	}
	
	@Override
	public Events loadById(int id) throws DbException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Events update(Events entity) throws DbException {
		if (entity == null || entity.getEventid() < 1) 
			throw new DbException("No connection to Database");
		
		if (!this.hasConnection()) 
			throw new DbException("No connection to Database");
		
		try {	
			Whitelist whitelist = new Whitelist();
			String date = Jsoup.clean(entity.getDate(), whitelist);
			String title = Jsoup.clean(entity.getTitle(), whitelist);
			String description = Jsoup.clean(entity.getDescription(), whitelist);
			
			String sql = "UPDATE " + this.tableName + " SET date=?, title=?, description=?, categoryid=? WHERE eventid=?";
			PreparedStatement preparedStatement = this.conn.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, date);
			preparedStatement.setString(2, title);
			preparedStatement.setString(3, description);
			preparedStatement.setInt(4, entity.getCategoryid());
			preparedStatement.setInt(5, entity.getEventid());
						
			int affectedRows = preparedStatement.executeUpdate();
			
			if (affectedRows != 1) 
				throw new SQLException("Update failed");
		} catch (SQLException e) {
			e.printStackTrace();
			throw new DbException("Could not select records", e);
		}
		return entity;
	}

	@Override
	public void delete(int id) throws DbException {
		if (!this.hasConnection())
			throw new DbException("No connection to Database");
		
		try {
			String sql = "DELETE FROM " + this.tableName + " WHERE eventid=?";
			PreparedStatement preparedStatement = this.conn.getConnection().prepareStatement(sql);
			preparedStatement.setInt(1, id);
			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			throw new DbException("Could not select records", e);
		}		
	}

	@Override
	public List<Events> loadAll() throws DbException {
		if (!this.hasConnection()) 
			throw new DbException("No connection to Database");
		
		List<Events> list = new ArrayList<Events>();
		
		try {
			String sql = "SELECT * FROM " + this.tableName + " ORDER BY date(date) ASC";
			PreparedStatement preparedStatement = this.conn.getConnection().prepareStatement(sql);
			ResultSet rs = preparedStatement.executeQuery();
			
			while (rs.next() != false) {
				Events entity = new Events();
				entity.setEventid(rs.getInt(1));
				entity.setDate(rs.getString(2));
				entity.setTitle(rs.getString(3));
				entity.setDescription(rs.getString(4));
				entity.setCategoryid(rs.getInt(5));
				list.add(entity);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new DbException("Could not select records", e);
		}
		return list;
	}

}

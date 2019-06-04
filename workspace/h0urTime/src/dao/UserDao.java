package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import exceptions.DbException;
import model.User;
import model.DbConnection;

public class UserDao extends GenericDao<User> {

	public UserDao(DbConnection conn) {
		super(User.class, "User", conn);
	}

	@Override
	public User loadById(int id) throws DbException {
		if (!this.hasConnection()) 
			throw new DbException("No connection to Database");
		
		User entity = new User();
		
		try {	
			String sql = "SELECT * FROM " + this.tableName + "WHERE userid=?";
			PreparedStatement preparedStatement = this.conn.getConnection().prepareStatement(sql);
			preparedStatement.setInt(1, id);
			ResultSet rs = preparedStatement.executeQuery();
			
			entity.setUserid(rs.getInt(1));
			entity.setName(rs.getString(2));
				
		} catch (SQLException e) {
			e.printStackTrace();
			throw new DbException("Could not select records", e);
		}
		return entity;
	}

	@Override
	public List<User> loadAll() throws DbException {
		if (!this.hasConnection()) 
			throw new DbException("No connection to Database");
		
		List<User> list = new ArrayList<User>();
		
		try {	
			String sql = "SELECT * FROM " + this.tableName;
			PreparedStatement preparedStatement = this.conn.getConnection().prepareStatement(sql);
			ResultSet rs = preparedStatement.executeQuery();
			
			while (rs.next() != false) {
				User entity = new User();
				entity.setUserid(rs.getInt(1));
				entity.setName(rs.getString(2));
				list.add(entity);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new DbException("Could not select records", e);
		}
		return list;
	}

	@Override
	public List<User> loadAllByUserId(int userid) throws DbException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User insert(User entity) throws DbException {
		if (!this.hasConnection()) 
			throw new DbException("No connection to Database");
		
		try {
			// NULL is working cause of NOT NULL AUTOINCREMENT combination
			// at primary key create table statement!!!
			String sql = "INSERT INTO " + this.tableName + " VALUES (NULL,?)";
			PreparedStatement preparedStatement = this.conn.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, entity.getName());	
			
			// get last auto generated id and assign to entity
			entity.setUserid(this.getLastAutoincrementId(preparedStatement));
			
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
	public User update(User entity) throws DbException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(int id) throws DbException {
		if (!this.hasConnection())
			throw new DbException("No connection to Database");
		
		try {
			String sql = "DELETE FROM " + this.tableName + " WHERE userid=?";
			PreparedStatement preparedStatement = this.conn.getConnection().prepareStatement(sql);
			preparedStatement.setInt(1, id);
			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			throw new DbException("Could not select records", e);
		}	
	}
	
}

package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import exceptions.DbException;
import model.Category;
import model.DbConnection;

public class CategoryDao extends GenericDao<Category> {

	public CategoryDao(DbConnection conn) {
		super(Category.class, "Category", conn);
	}
	
	@Override
	public Category insert(Category entity) throws DbException {
		if (!this.hasConnection()) 
			throw new DbException("No connection to Database");
		
		try {
			// NULL is working cause of NOT NULL AUTOINCREMENT combination
			// at primary key create table statement!!!
			String sql = "INSERT INTO " + this.tableName + " VALUES (NULL,?,?)";
			PreparedStatement preparedStatement = this.conn.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, entity.getName());
			preparedStatement.setString(2, entity.getColor());
			
			// get last auto generated id and assign to entity
			entity.setCategoryid(this.getLastAutoincrementId(preparedStatement));
			
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
	public Category loadById(int id) throws DbException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Category> loadAll() throws DbException {
		if (!this.hasConnection()) 
			throw new DbException("No connection to Database");
		
		List<Category> list = new ArrayList<Category>();
		
		try {	
			String sql = "SELECT * FROM " + this.tableName;
			PreparedStatement preparedStatement = this.conn.getConnection().prepareStatement(sql);
			ResultSet rs = preparedStatement.executeQuery();
			
			while (rs.next() != false) {
				Category entity = new Category();
				entity.setCategoryid(rs.getInt(1));
				entity.setName(rs.getString(2));
				entity.setColor(rs.getString(3));
				list.add(entity);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new DbException("Could not select records", e);
		}
		return list;
	}

	@Override
	public Category update(Category entity) throws DbException {
		if (entity == null || entity.getCategoryid() < 1) 
			throw new DbException("No connection to Database");
		
		if (!this.hasConnection()) 
			throw new DbException("No connection to Database");
		
		try {	
			String sql = "UPDATE" + this.tableName + " SET name=?, color=? WHERE categoryid=?";
			PreparedStatement preparedStatement = this.conn.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, entity.getName());
			preparedStatement.setString(2, entity.getColor());
			preparedStatement.setInt(3, entity.getCategoryid());
			
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
			String sql = "DELETE FROM " + this.tableName + " WHERE categoryid=?";
			PreparedStatement preparedStatement = this.conn.getConnection().prepareStatement(sql);
			preparedStatement.setInt(1, id);
			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			throw new DbException("Could not select records", e);
		}
	}

	@Override
	public List<Category> loadAllByUserId(int userid) throws DbException {
		// TODO Auto-generated method stub
		return null;
	}
}
